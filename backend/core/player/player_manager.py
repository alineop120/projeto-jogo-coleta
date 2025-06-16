# backend/core/player/player_manager.py
from typing import Dict, Tuple, Optional

class Player:
    def __init__(self):
        self.pos = {'x': 0, 'y': 0}  # Posição inicial
        self.inventory = []
        self.speed = 1  # Caso queira implementar velocidade diferente
        self.map_boundaries = (10, 10)  # Limites do mapa (width, height)

    def mover(self, new_pos, game_map):
        # Valida se a nova posição está dentro do mapa
        if not (0 <= new_pos['x'] < game_map['width'] and 0 <= new_pos['y'] < game_map['height']):
            return False
        
        # Valida se a posição é caminhável
        if not game_map['tiles'][new_pos['y']][new_pos['x']]['walkable']:
            return False
        
        self.pos = new_pos
        return True

    def _set_position(self, x: int, y: int) -> bool:
        """Valida e atualiza a posição do jogador"""
        if self._is_valid_position(x, y):
            self.pos = {'x': x, 'y': y}
            return True
        return False

    def _is_valid_position(self, x: int, y: int) -> bool:
        """Verifica se a posição está dentro dos limites do mapa"""
        map_width, map_height = self.map_boundaries
        return 0 <= x < map_width and 0 <= y < map_height

    def status(self) -> Dict:
        return {
            'position': self.pos,
            'inventory': self.inventory,
            'speed': self.speed
        }

# Instância global do jogador
player = Player()