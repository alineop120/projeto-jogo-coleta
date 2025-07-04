import random
import threading
import logging
from typing import List, Dict
from pathlib import Path
import json

logger = logging.getLogger(__name__)
lock = threading.Lock()

BASE_DIR = Path(__file__).parent.parent
RECURSOS_JSON = BASE_DIR / "data" / "recursos.json"

# Definição de cantos possíveis para spawn (exemplo: mapa 10x10)
CANTOS = [
    {"x": 0, "y": 0},
    {"x": 0, "y": 9},
    {"x": 9, "y": 0},
    {"x": 9, "y": 9}
]

def carregar_recursos() -> List[Dict]:
    try:
        with open(RECURSOS_JSON, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.warning("Arquivo recursos.json não encontrado. Gerando recursos padrão.")
        return _gerar_recursos_padrao()

def salvar_recursos(recursos: List[Dict]) -> bool:
    try:
        with open(RECURSOS_JSON, "w", encoding="utf-8") as f:
            json.dump(recursos, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        logger.error(f"Erro ao salvar recursos: {e}")
        return False

def _gerar_recursos_padrao() -> List[Dict]:
    recursos = []
    tipos = ["madeira", "pedra", "metal"]
    for i, canto in enumerate(CANTOS, start=1):
        recurso = {
            "id": i,
            "tipo": random.choice(tipos),
            "x": canto["x"],
            "y": canto["y"]
        }
        recursos.append(recurso)
    return recursos

def get_recursos_estado() -> List[Dict]:
    with lock:
        return carregar_recursos()

def spawn_recurso_aleatorio():
    """Adiciona um recurso em um canto aleatório."""
    with lock:
        recursos = carregar_recursos()
        novo_id = max([r['id'] for r in recursos], default=0) + 1
        tipo = random.choice(["madeira", "pedra", "metal"])
        canto = random.choice(CANTOS)
        recurso = {
            "id": novo_id,
            "tipo": tipo,
            "x": canto["x"],
            "y": canto["y"]
        }
        recursos.append(recurso)
        if salvar_recursos(recursos):
            logger.info(f"Recurso {tipo} spawnado no canto ({canto['x']}, {canto['y']})")
        else:
            logger.error("Falha ao salvar recurso spawnado")

def remover_recurso(id_recurso: int) -> bool:
    """Remove recurso por id, ex: ao coletar."""
    with lock:
        recursos = carregar_recursos()
        recursos_novos = [r for r in recursos if r["id"] != id_recurso]
        if len(recursos_novos) == len(recursos):
            return False  # recurso não encontrado
        sucesso = salvar_recursos(recursos_novos)
        return sucesso

