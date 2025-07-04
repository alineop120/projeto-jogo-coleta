# File: backend/core/player/player_manager.py

from typing import Dict, Optional
from core.player.inventory import Inventory

class Player:
    def __init__(self, map_boundaries=(10,10)):
        self.pos = {'x': 0, 'y': 0}  # posição inicial
        self.inventory = Inventory()
        self.speed = 1
        self.map_boundaries = map_boundaries

    def mover(self, new_pos: Dict[str, int], game_map: Dict) -> bool:
        x, y = new_pos.get('x'), new_pos.get('y')
        if x is None or y is None:
            return False
        if not self._is_valid_position(x, y):
            return False
        # Valida se a posição é caminhável
        if not game_map['tiles'][y][x].get('walkable', False):
            return False
        self.pos = {'x': x, 'y': y}
        return True

    def _is_valid_position(self, x: int, y: int) -> bool:
        map_width, map_height = self.map_boundaries
        return 0 <= x < map_width and 0 <= y < map_height

    def status(self) -> Dict:
        return {
            'position': self.pos,
            'inventory': self.inventory.get_items(),
            'speed': self.speed
        }

# Instância global
player = Player()