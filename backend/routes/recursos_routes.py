from flask import Blueprint, jsonify

recursos_api = Blueprint('recursos_api', __name__)

@recursos_api.route('/')
def get_recursos():
    return jsonify([
        {"id": 1, "tipo": "madeira", "x": 3, "y": 5},
        {"id": 2, "tipo": "pedra", "x": 7, "y": 2}
    ])
