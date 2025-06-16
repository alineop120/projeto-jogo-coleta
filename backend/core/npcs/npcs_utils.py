# backend/core/npcs/npc_utils.py
from datetime import datetime

def tempo_passou(data_str, limite):
    """Verifica se o tempo passou do limite"""
    if not data_str:
        return True
    data = datetime.fromisoformat(data_str)
    return datetime.utcnow() - data > limite