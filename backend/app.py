import sys
import os
import json
from pathlib import Path
from flask import Flask
from flask_cors import CORS
from routes.player_routes import player_api
from routes.npcs_routes import npcs_api
from routes.recursos_routes import recursos_api
from core.npcs.npcs_threads import start_npc_threads

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

MAPA_PATH = Path(__file__).parent / 'dados' / 'mapa.json'

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # CORS mais permissivo

with open(MAPA_PATH, 'r') as f:
    game_map = json.load(f)

# Registre os blueprints com prefixos consistentes
app.register_blueprint(player_api, url_prefix="/api/player")
app.register_blueprint(npcs_api, url_prefix="/api/npcs")
app.register_blueprint(recursos_api, url_prefix="/api/recursos")

if __name__ == "__main__":
    start_npc_threads()
    app.run(host='0.0.0.0', port=5000, debug=True)  # Configuração explícita