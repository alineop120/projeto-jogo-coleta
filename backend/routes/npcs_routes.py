from flask import Blueprint, jsonify, request
from core.npcs.npcs_manager import get_npcs, mover_npc

npcs_api = Blueprint('npcs_api', __name__)

@npcs_api.route("/", methods=["GET"])
def estado():
    npcs = get_npcs()
    return jsonify(npcs)

@npcs_api.route("/mover", methods=["POST"])
def mover():
    data = request.get_json()
    id_npc = data.get("id")
    x = data.get("x")
    y = data.get("y")
    
    if id_npc is None or x is None or y is None:
        return jsonify({"ok": False, "mensagem": "Parâmetros inválidos."}), 400

    sucesso = mover_npc(id_npc, x, y)

    if sucesso:
        return jsonify({"ok": True, "mensagem": "NPC movido."})
    else:
        return jsonify({"ok": False, "mensagem": "NPC não encontrado."}), 404
