# File: backend/routes/map_routes.py

from flask import Blueprint, jsonify
import os
import json

mapa_bp = Blueprint('mapa', __name__)

@mapa_bp.route('/mapa', methods=['GET'])
def get_mapa():
    mapa_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'mapa.json')
    with open(mapa_path, 'r', encoding='utf-8') as f:
        mapa_data = json.load(f)
    return jsonify(mapa_data)