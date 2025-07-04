# File: backend/routes/inventory_routes.py

from flask import Blueprint, request, jsonify
from core.player.player_manager import player

inventory_bp = Blueprint('inventory', __name__, url_prefix='/api/player/inventory')

@inventory_bp.route('/', methods=['GET'])
def listar_itens():
    itens = player.inventory.get_items()
    return jsonify(itens), 200

@inventory_bp.route('/', methods=['POST'])
def adicionar_item():
    item = request.json
    if not item or 'id' not in item or 'nome' not in item:
        return jsonify({'error': 'Item inválido'}), 400
    player.inventory.add_item(item)
    return jsonify({'message': 'Item adicionado'}), 201

@inventory_bp.route('/<item_id>', methods=['DELETE'])
def remover_item(item_id):
    sucesso = player.inventory.remove_item(item_id)
    if sucesso:
        return jsonify({'message': 'Item removido'}), 200
    else:
        return jsonify({'error': 'Item não encontrado'}), 404