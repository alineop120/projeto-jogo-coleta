import sys
import os
import json
from pathlib import Path
from flask import Flask
from flask_cors import CORS
from routes.map_routes import mapa_bp
from routes.player_routes import player_api
from routes.npcs_routes import npcs_api
from routes.recursos_routes import recursos_api
from core.npcs.npcs_threads import start_npc_threads

sys.path.append(str(Path(__file__).parent.resolve()))

MAPA_PATH = Path(__file__).parent / 'data' / 'mapa.json'

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

with open(MAPA_PATH, 'r', encoding='utf-8') as f:
    game_map = json.load(f)

# Registro de blueprints
app.register_blueprint(mapa_bp, url_prefix='/api')
app.register_blueprint(player_api, url_prefix="/api/player")
app.register_blueprint(npcs_api, url_prefix="/api/npcs")
app.register_blueprint(recursos_api, url_prefix="/api/recursos")

if __name__ == "__main__":
    start_npc_threads()
    app.run(host='0.0.0.0', port=5000, debug=True)