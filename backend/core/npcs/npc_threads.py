# File: backend/core/npcs/npc_threads.py

import threading
import time
import logging
from core.npcs.npc_manager import atualizar_todos_npcs

logger = logging.getLogger(__name__)

class NPCThreadManager:
    """Gerenciador da thread para automação dos NPCs."""
    
    def __init__(self, intervalo: int = 5):
        self.intervalo = intervalo
        self._stop_event = threading.Event()
        self._thread = None
        self._last_run = None
        self._exception = None

    def _npc_loop(self):
        logger.info("Thread de NPCs iniciada")
        try:
            while not self._stop_event.is_set():
                start_time = time.time()
                try:
                    atualizar_todos_npcs()
                except Exception as e:
                    logger.error(f"Erro na atualização de NPCs: {e}", exc_info=True)
                    self._exception = e
                    continue  # Ou use break, se quiser encerrar a thread em falhas

                self._last_run = time.time()
                elapsed = self._last_run - start_time
                sleep_time = self.intervalo - elapsed
                if sleep_time > 0:
                    self._stop_event.wait(timeout=sleep_time)
        finally:
            logger.info("Thread de NPCs finalizada")

    def start(self):
        if self._thread and self._thread.is_alive():
            logger.warning("Thread de NPCs já está em execução")
            return
        self._stop_event.clear()
        self._thread = threading.Thread(target=self._npc_loop, daemon=True, name="NPCThread")
        self._thread.start()
        logger.info(f"Thread de NPCs iniciada com intervalo de {self.intervalo}s")

    def stop(self, timeout: float = 5.0):
        if not self._thread or not self._thread.is_alive():
            return
        logger.info("Solicitando parada da thread de NPCs")
        self._stop_event.set()
        self._thread.join(timeout=timeout)
        if self._thread.is_alive():
            logger.warning("Thread de NPCs não respondeu ao pedido de parada")

    def status(self):
        from datetime import datetime
        return {
            "running": self._thread.is_alive() if self._thread else False,
            "interval": self.intervalo,
            "last_run": (
                datetime.utcfromtimestamp(self._last_run).isoformat()
                if self._last_run else None
            ),
            "error": str(self._exception) if self._exception else None
        }

# Instância global
npc_thread_manager = NPCThreadManager(intervalo=5)

def start_npc_threads():
    npc_thread_manager.start()

def stop_npc_threads():
    npc_thread_manager.stop()