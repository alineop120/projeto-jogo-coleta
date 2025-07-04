# File: backend/app.py

import sys
import json
from pathlib import Path

from flask import Flask
from flask_cors import CORS

# Blueprints
from routes.map_routes import mapa_bp
from routes.player_routes import player_api
from routes.npcs_routes import npcs_api
from routes.recursos_routes import recursos_api

# Threads dos NPCs
from backend.core.npcs.npc_threads import start_npc_threads

BASE_DIR = Path(__file__).parent.resolve()
DATA_DIR = BASE_DIR / 'data'
MAPA_PATH = DATA_DIR / 'mapa.json'

sys.path.append(str(BASE_DIR))  # para importações absolutas

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Carrega mapa no config para usar em rotas e player
    try:
        with open(MAPA_PATH, 'r', encoding='utf-8') as f:
            app.config["MAPA_JOGO"] = json.load(f)
    except FileNotFoundError:
        app.logger.error(f"Mapa não encontrado em: {MAPA_PATH}")
        app.config["MAPA_JOGO"] = {}

    # Registro das rotas
    app.register_blueprint(mapa_bp, url_prefix='/api')
    app.register_blueprint(player_api, url_prefix='/api/player')
    app.register_blueprint(npcs_api, url_prefix='/api/npcs')
    app.register_blueprint(recursos_api, url_prefix='/api/recursos')

    return app

if __name__ == "__main__":
    app = create_app()
    start_npc_threads()  # inicia threads para NPCs
    app.run(host='0.0.0.0', port=5000, debug=True)