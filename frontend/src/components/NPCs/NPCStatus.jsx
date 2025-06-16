// src/components/NPCs/NPCStatus.jsx
import React from "react";

export default function NPCStatus({ npc }) {
    return (
        <div>
            <p>{npc.nome}</p>
            <p>Vida: {npc.vida}</p>
            <p>Status: {npc.status}</p>
        </div>
    );
}