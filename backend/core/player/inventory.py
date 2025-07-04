import threading
from typing import Dict, List, Optional

class Inventory:
    def __init__(self):
        self._items: List[Dict] = []
        self._lock = threading.Lock()

    def add_item(self, item: Dict) -> None:
        with self._lock:
            self._items.append(item)

    def remove_item(self, item_id: str) -> bool:
        with self._lock:
            for i, item in enumerate(self._items):
                if item.get('id') == item_id:
                    del self._items[i]
                    return True
            return False

    def get_items(self) -> List[Dict]:
        with self._lock:
            return self._items.copy()

    def find_item(self, item_id: str) -> Optional[Dict]:
        with self._lock:
            for item in self._items:
                if item.get('id') == item_id:
                    return item
            return None

    def clear(self) -> None:
        with self._lock:
            self._items.clear()