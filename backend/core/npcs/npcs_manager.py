# npc_manager.py
import json
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import logging
import random
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent  # Ajuste esse caminho para sua estrutura

# Configuração básica de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

CAMINHO_ARQUIVO = BASE_DIR / "data" / "npcs.json"

# Modelo de dados para validação
NPC_SCHEMA = {
    "type": "object",
    "properties": {
        "id": {"type": "string"},
        "nome": {"type": "string"},
        "status": {"type": "string", "enum": ["idle", "movendo", "coletando", "na loja", "na guilda"]},
        "localizacao": {
            "type": "object",
            "properties": {
                "x": {"type": "number"},
                "y": {"type": "number"}
            },
            "required": ["x", "y"]
        },
        "tempo_ultimo_status": {"type": "string", "format": "date-time"}
    },
    "required": ["id", "nome", "status", "localizacao"]
}

def validar_npc(npc_data: Dict) -> bool:
    """Valida os dados do NPC contra o schema"""
    try:
        # Implementação básica de validação (pode ser substituída por Pydantic)
        assert isinstance(npc_data, dict)
        for field in NPC_SCHEMA["required"]:
            assert field in npc_data
        return True
    except AssertionError as e:
        logger.error(f"Dados inválidos do NPC: {e}")
        return False

def carregar_npcs():
    try:
        with open(CAMINHO_ARQUIVO, "r", encoding="utf-8") as f:
            npcs = json.load(f)
            # Garante posições iniciais próximas (0-9) se estiverem muito longe
            for npc in npcs:
                if npc["localizacao"]["x"] > 10 or npc["localizacao"]["y"] > 10:
                    npc["localizacao"] = {
                        "x": random.randint(0, 9),
                        "y": random.randint(0, 9)
                    }
            return npcs
    except FileNotFoundError:
        # Posições iniciais aleatórias próximas (0-9)
        return [
            {
                "id": 1,
                "nome": "NPC 1",
                "localizacao": {"x": random.randint(0, 9), "y": random.randint(0, 9)},
                "status": "idle"
            },
            {
                "id": 2,
                "nome": "NPC 2", 
                "localizacao": {"x": random.randint(0, 9), "y": random.randint(0, 9)},
                "status": "idle"
            }
        ]

def salvar_npcs(npcs: List[Dict]) -> bool:
    """Salva NPCs no arquivo JSON com validação"""
    try:
        with open(CAMINHO_ARQUIVO, "w", encoding="utf-8") as f:
            json.dump([npc for npc in npcs if validar_npc(npc)], 
                    f, 
                    ensure_ascii=False, 
                    indent=2)
        return True
    except Exception as e:
        logger.error(f"Erro ao salvar NPCs: {e}")
        return False

def get_npcs():
    return carregar_npcs()

def mover_npc(id_npc, x, y):
    npcs = carregar_npcs()
    for npc in npcs:
        if npc["id"] == id_npc:
            npc["localizacao"] = {"x": x, "y": y}
            salvar_npcs(npcs)
            return True
    return False


class NPCAI:
    """Classe para gerenciar a inteligência artificial dos NPCs"""
    TEMPO_POR_ESTADO = {
        "idle": timedelta(seconds=5),
        "movendo": timedelta(seconds=8),
        "coletando": timedelta(seconds=10),
        "na loja": timedelta(seconds=7),
        "na guilda": timedelta(seconds=6)
    }

    @staticmethod
    def proximo_estado(estado_atual: str) -> str:
        """Máquina de estados dos NPCs"""
        estados = ["idle", "movendo", "coletando", "na loja", "na guilda"]
        try:
            indice = estados.index(estado_atual)
            return estados[(indice + 1) % len(estados)]
        except ValueError:
            logger.warning(f"Estado inválido: {estado_atual}")
            return "idle"

def tempo_passou(data_str, limite):
    """Verifica se o tempo passou do limite"""
    if not data_str:
        return True
    data = datetime.fromisoformat(data_str)
    return datetime.utcnow() - data > limite

def atualizar_estado_npc(npc):
    agora = datetime.utcnow()
    tempo_limite = timedelta(seconds=10)  # Aumente o tempo entre movimentos

    if npc["status"] == "idle" and tempo_passou(npc.get("tempo_ultimo_status"), tempo_limite):
        npc["status"] = "movendo"
        # Movimento limitado a 1 unidade em qualquer direção
        npc["localizacao"]["x"] = max(0, min(9, npc["localizacao"]["x"] + random.randint(-1, 1)))
        npc["localizacao"]["y"] = max(0, min(9, npc["localizacao"]["y"] + random.randint(-1, 1)))
        npc["tempo_ultimo_status"] = agora.isoformat()
    
    elif npc["status"] == "movendo" and tempo_passou(npc.get("tempo_ultimo_status"), tempo_limite):
        npc["status"] = "idle"
        npc["tempo_ultimo_status"] = agora.isoformat()

def atualizar_todos_npcs() -> None:
    """Atualiza o estado de todos os NPCs"""
    npcs = carregar_npcs()
    logger.info(f"Iniciando atualização para {len(npcs)} NPCs")
    
    for npc in npcs:
        try:
            atualizar_estado_npc(npc)
        except Exception as e:
            logger.error(f"Erro ao atualizar NPC {npc.get('id')}: {e}")
    
    if not salvar_npcs(npcs):
        logger.error("Falha ao salvar NPCs atualizados")

# Interface pública do módulo
__all__ = ['carregar_npcs', 'salvar_npcs', 'atualizar_todos_npcs', 'mover_npc']