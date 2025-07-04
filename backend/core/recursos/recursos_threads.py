import threading
import time
import logging
from .recurso_manager import spawn_recurso_aleatorio

logger = logging.getLogger(__name__)

class RecursosThreadManager:
    def __init__(self, intervalo: int = 30):
        self.intervalo = intervalo
        self._stop_event = threading.Event()
        self._thread = None

    def _loop(self):
        logger.info("Thread de recursos iniciada")
        while not self._stop_event.is_set():
            try:
                spawn_recurso_aleatorio()
            except Exception as e:
                logger.error(f"Erro ao spawnar recurso: {e}")
            self._stop_event.wait(self.intervalo)
        logger.info("Thread de recursos finalizada")

    def start(self):
        if self._thread and self._thread.is_alive():
            logger.warning("Thread de recursos já está rodando")
            return
        self._stop_event.clear()
        self._thread = threading.Thread(target=self._loop, daemon=True, name="RecursosThread")
        self._thread.start()
        logger.info(f"Thread de recursos iniciada com intervalo de {self.intervalo}s")

    def stop(self, timeout=5.0):
        if not self._thread:
            return
        self._stop_event.set()
        self._thread.join(timeout)
        if self._thread.is_alive():
            logger.warning("Thread de recursos não parou após timeout")

# Instância global
recursos_thread_manager = RecursosThreadManager(intervalo=30)

def start_recursos_thread():
    recursos_thread_manager.start()
