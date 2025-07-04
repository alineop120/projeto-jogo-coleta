# File: backend/routes/recursos_routes.py

from flask import Blueprint, jsonify
from core.recursos.recurso_manager import get_recursos_estado

recursos_api = Blueprint('recursos_api', __name__, url_prefix='/api/recursos')

@recursos_api.route('/', methods=['GET'])
def get_recursos():
    recursos = get_recursos_estado()
    return jsonify(recursos), 200