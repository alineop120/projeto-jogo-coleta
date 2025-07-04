# backend/config.py

from pathlib import Path

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / 'data'

# Arquivos de dados
MAPA_PATH = DATA_DIR / 'mapa.json'
NPCS_PATH = DATA_DIR / 'npcs.json'
RECURSOS_PATH = DATA_DIR / 'recursos.json'

# Tamanho padrão do mapa
MAP_WIDTH = 10
MAP_HEIGHT = 10
MAP_BOUNDS = (MAP_WIDTH, MAP_HEIGHT)

# Tempo padrão de atualização de NPCs
NPC_UPDATE_INTERVAL = 5  # segundos