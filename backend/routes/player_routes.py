# File: backend/routes/player_routes.py

from flask import Blueprint, jsonify, request, current_app
from core.player.player_manager import player

player_api = Blueprint('player_api', __name__)

@player_api.route('/', methods=['GET'])
def get_player():
    return jsonify(player.status()), 200

@player_api.route('/status', methods=['GET'])
def player_status():
    return jsonify(player.status()), 200

@player_api.route('/mover', methods=['POST'])
def mover_player():
    data = request.get_json() or {}
    new_pos = data.get('position')
    
    if not new_pos or not isinstance(new_pos, dict):
        return jsonify({'error': 'Posição inválida ou não informada'}), 400

    game_map = current_app.config.get("MAPA_JOGO", {})
    
    valid_move = player.mover(new_pos, game_map)
    
    if valid_move:
        return jsonify({'success': True, 'pos': player.pos}), 200
    else:
        return jsonify({'error': 'Movimento inválido'}), 400