from flask import Blueprint, jsonify, request
from core.player.player_manager import player
from core.map.game_map import game_map

player_api = Blueprint('player_api', __name__)

@player_api.route('/', methods=['GET'])
def get_player():
    return jsonify(player.status()), 200


@player_api.route('/status', methods=['GET'])
def player_status():
    return jsonify(player.status())

@player_api.route('/mover', methods=['POST'])
def mover_player():
    data = request.get_json()
    new_pos = data.get('position')
    print(f"Nova posição recebida: {new_pos}")
    
    if not new_pos:
        return jsonify({'error': 'Posição não informada'}), 400
    
    valid_move = player.mover(new_pos, game_map)
    print(f"Movimento válido? {valid_move}")
    print(f"Posição atual do jogador: {player.pos}")
    
    # Se tiver função para saber por que movimento foi negado, use e logue aqui.
    
    if valid_move:
        return jsonify({'success': True, 'pos': player.pos})
    else:
        return jsonify({'error': 'Movimento inválido'}), 400
