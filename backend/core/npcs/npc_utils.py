# backend/core/npcs/npc_utils.py
from datetime import datetime, timedelta
from typing import Optional, Union
import logging

logger = logging.getLogger(__name__)

def tempo_passou(data_str: Optional[str], limite: timedelta) -> bool:
    """
    Verifica se o tempo desde data_str ultrapassou o limite.
    
    Args:
        data_str (str): Data em formato ISO 8601 (ex: '2025-06-23T15:00:00').
        limite (timedelta): Tempo máximo permitido desde a data.
    
    Returns:
        bool: True se o tempo passou, False caso contrário.
    """
    if not data_str:
        return True

    try:
        data = datetime.fromisoformat(data_str)
    except (ValueError, TypeError) as e:
        logger.warning(f"Formato de data inválido: {data_str}. Erro: {e}")
        return True  # Considera como "tempo expirado" se inválido

    return datetime.utcnow() - data > limite