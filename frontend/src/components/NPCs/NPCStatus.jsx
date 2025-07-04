// File: frontend/src/components/NPCs/NPCStatus.jsx
import React from "react";
import PropTypes from "prop-types";

export default function NPCStatus({ npc }) {
    if (!npc) return <div>Nenhum NPC selecionado.</div>;

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#f9f9f9",
                borderRadius: "4px",
                maxWidth: "200px",
            }}
            aria-label={`Status do NPC ${npc.nome}`}
        >
            <h4>{npc.nome}</h4>
            <p><strong>Vida:</strong> {npc.vida ?? "Desconhecida"}</p>
            <p><strong>Status:</strong> {npc.status}</p>
        </div>
    );
}

NPCStatus.propTypes = {
    npc: PropTypes.shape({
        nome: PropTypes.string.isRequired,
        vida: PropTypes.number,
        status: PropTypes.string,
    }),
};