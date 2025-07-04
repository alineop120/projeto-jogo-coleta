# File: backend/core/npcs/npc_manager.py

import json
import random
import threading
from datetime import datetime, timedelta
from pathlib import Path
import logging
from typing import List, Dict, Optional

from backend.config import NPCS_PATH, MAP_WIDTH, MAP_HEIGHT

logger = logging.getLogger(__name__)

_lock = threading.Lock()
_cache_npcs: Optional[List[Dict]] = None

# ------------------ UTILITÁRIOS ------------------

def tempo_passou(data_str: Optional[str], limite: timedelta) -> bool:
    """Verifica se o tempo decorrido passou do limite."""
    if not data_str:
        return True
    try:
        data = datetime.fromisoformat(data_str)
        return datetime.utcnow() - data > limite
    except ValueError:
        return True

# ------------------ ARQUIVO / I/O ------------------

def _gerar_npcs_padrao() -> List[Dict]:
    return [
        {
            "id": str(i),
            "nome": f"NPC {i}",
            "status": "idle",
            "localizacao": {"x": random.randint(0, MAP_WIDTH-1), "y": random.randint(0, MAP_HEIGHT-1)},
            "tempo_ultimo_status": datetime.utcnow().isoformat()
        }
        for i in range(1, 3)
    ]

def _carregar_npcs_arquivo() -> List[Dict]:
    try:
        with open(NPCS_PATH, "r", encoding="utf-8") as f: 
            return json.load(f)
    except FileNotFoundError:
        logger.warning("Arquivo npcs.json não encontrado. Gerando NPCs padrão.")
        return _gerar_npcs_padrao()
    except Exception as e:
        logger.error(f"Erro ao carregar NPCs: {e}")
        return []

def carregar_npcs() -> List[Dict]:
    global _cache_npcs
    with _lock:
        if _cache_npcs is None:
            _cache_npcs = _carregar_npcs_arquivo()
        return _cache_npcs

def salvar_npcs(npcs: List[Dict]) -> bool:
    global _cache_npcs
    with _lock:
        try:
            with open(NPCS_PATH, "w", encoding="utf-8") as f: 
                json.dump(npcs, f, ensure_ascii=False, indent=2)
            _cache_npcs = [dict(npc) for npc in npcs]
            return True
        except Exception as e:
            logger.error(f"Erro ao salvar NPCs: {e}")
            return False

# ------------------ INTELIGÊNCIA ARTIFICIAL ------------------

class NPCAI:
    """Gerencia o estado e comportamento dos NPCs."""

    TEMPOS_ESTADO = {
        "idle": timedelta(seconds=5),
        "movendo": timedelta(seconds=8),
        "coletando": timedelta(seconds=10),
        "na loja": timedelta(seconds=7),
        "na guilda": timedelta(seconds=6)
    }

    ESTADOS = list(TEMPOS_ESTADO.keys())

    @classmethod
    def proximo_estado(cls, atual: str) -> str:
        try:
            idx = cls.ESTADOS.index(atual)
            return cls.ESTADOS[(idx + 1) % len(cls.ESTADOS)]
        except ValueError:
            logger.warning(f"Estado inválido '{atual}'. Reiniciando para 'idle'")
            return "idle"

    @classmethod
    def atualizar_estado(cls, npc: Dict) -> None:
        estado = npc.get("status", "idle")
        tempo_str = npc.get("tempo_ultimo_status")
        limite = cls.TEMPOS_ESTADO.get(estado, timedelta(seconds=5))

        if tempo_passou(tempo_str, limite):
            novo_estado = cls.proximo_estado(estado)
            npc["status"] = novo_estado
            npc["tempo_ultimo_status"] = datetime.utcnow().isoformat()

            if novo_estado == "movendo":
                npc["localizacao"] = cls._nova_posicao(npc["localizacao"])

    @staticmethod
    def _nova_posicao(pos: Dict[str, int]) -> Dict[str, int]:
        dx, dy = random.randint(-1, 1), random.randint(-1, 1)
        x = max(0, min(MAP_WIDTH - 1, pos["x"] + dx))
        y = max(0, min(MAP_HEIGHT - 1, pos["y"] + dy))
        return {"x": x, "y": y}

# ------------------ FUNÇÕES PRINCIPAIS ------------------

def atualizar_todos_npcs() -> None:
    with _lock:
        npcs = carregar_npcs()
        logger.info(f"Atualizando {len(npcs)} NPCs")

        for npc in npcs:
            try:
                NPCAI.atualizar_estado(npc)
            except Exception as e:
                logger.error(f"Erro ao atualizar NPC {npc.get('id')}: {e}")

        salvar_npcs(npcs)

def mover_npc(id_npc: str, x: int, y: int) -> bool:
    with _lock:
        npcs = carregar_npcs()
        for npc in npcs:
            if npc["id"] == id_npc:
                npc["localizacao"] = {"x": x, "y": y}
                return salvar_npcs(npcs)
    return False

def get_npcs() -> List[Dict]:
    with _lock:
        return carregar_npcs()