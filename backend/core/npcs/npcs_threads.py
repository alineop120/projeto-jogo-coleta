# core/npcs/npc_threads.py
import threading
import time
import logging
from typing import Optional
from .npcs_manager import atualizar_todos_npcs

logger = logging.getLogger(__name__)

class NPCThreadManager:
    """Gerenciador de thread para automação de NPCs"""
    
    def __init__(self, intervalo: int = 5):
        self.intervalo = intervalo
        self._stop_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self._last_run: Optional[float] = None
        self._exception: Optional[Exception] = None

    def _npc_loop(self) -> None:
        """Loop principal de atualização dos NPCs"""
        logger.info("Thread de NPCs iniciada")
        try:
            while not self._stop_event.is_set():
                start_time = time.time()
                
                try:
                    atualizar_todos_npcs()
                except Exception as e:
                    logger.error(f"Erro na atualização de NPCs: {e}")
                    self._exception = e
                    break
                
                self._last_run = time.time()
                sleep_time = self.intervalo - (time.time() - start_time)
                if sleep_time > 0:
                    self._stop_event.wait(sleep_time)
        finally:
            logger.info("Thread de NPCs finalizada")

    def start(self) -> None:
        """Inicia a thread de automação de NPCs"""
        if self._thread and self._thread.is_alive():
            logger.warning("Thread de NPCs já está em execução")
            return
            
        self._stop_event.clear()
        self._thread = threading.Thread(
            target=self._npc_loop,
            daemon=True,
            name="NPCThread"
        )
        self._thread.start()
        logger.info(f"Thread de NPCs iniciada com intervalo de {self.intervalo}s")

    def stop(self, timeout: float = 5.0) -> None:
        """Para a thread de automação de NPCs"""
        if not self._thread or not self._thread.is_alive():
            return
            
        logger.info("Solicitando parada da thread de NPCs")
        self._stop_event.set()
        self._thread.join(timeout=timeout)
        
        if self._thread.is_alive():
            logger.warning("Thread de NPCs não respondeu ao pedido de parada")

    def status(self) -> dict:
        """Retorna o status atual da thread"""
        return {
            "running": self._thread.is_alive() if self._thread else False,
            "interval": self.intervalo,
            "last_run": self._last_run,
            "error": str(self._exception) if self._exception else None
        }

# Instância global para uso no sistema
npc_thread_manager = NPCThreadManager(intervalo=5)

def start_npc_threads():
    """Função de inicialização para uso externo"""
    npc_thread_manager.start()