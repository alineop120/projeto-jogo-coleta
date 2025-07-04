# File: backend/core/utils/map_utils.py

import json
from pathlib import Path
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

MAPA_PATH = Path(__file__).resolve().parents[2] / 'data' / 'mapa.json'

def carregar_mapa() -> Dict[str, Any]:
    try:
        with MAPA_PATH.open(encoding='utf-8') as f:
            mapa = json.load(f)
        logger.info("Mapa carregado com sucesso.")
        return mapa
    except FileNotFoundError:
        logger.error(f"Arquivo não encontrado: {MAPA_PATH}")
        return {}
    except json.JSONDecodeError as e:
        logger.error(f"Erro ao ler JSON do mapa: {e}")
        return {}