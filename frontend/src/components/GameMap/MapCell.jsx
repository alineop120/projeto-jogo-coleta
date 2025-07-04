// File: frontend/src/components/GameMap/MapCell.jsx
import React from "react";

const CELL_SIZE = 40;

const emojis = {
    L: "🏪",
    G: "🛡️",
    X: "🚧",
    madeira: "🌳",
    pedra: "⛏️",
    player: "🚶‍♂️",
    npc: "🤖",
};

export default function MapCell({ cel, x, y, player, npcHere, recursoHere }) {
    const color = cel === "X" ? "gray" : cel === "L" ? "#ADD8E6" : cel === "G" ? "#FFD700" : "white";

    const isPlayer = player.pos.x === x && player.pos.y === y;

    return (
        <div
            style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: color,
                border: "1px solid black",
                position: "relative",
                fontSize: "1.5em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
            }}
        >
            {emojis[cel] && <span>{emojis[cel]}</span>}
            {isPlayer && <span title="Jogador">{emojis.player}</span>}
            {npcHere && <span title={`NPC: ${npcHere.nome}`}>{emojis.npc}</span>}
            {recursoHere && (
                <span title={`Recurso: ${recursoHere.tipo}`}>
                    {emojis[recursoHere.tipo]}
                </span>
            )}
        </div>
    );
}
