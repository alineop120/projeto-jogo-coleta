import sys
from pathlib import Path
import json

sys.path.append(str(Path(__file__).parent.parent.parent))

MAPA_PATH = Path(__file__).parent.parent.parent / 'data' / 'mapa.json'

with open(MAPA_PATH, 'r', encoding='utf-8') as f:
    game_map = json.load(f)


print("Mapa carregado com sucesso!")  # Só pra confirmar que carregou