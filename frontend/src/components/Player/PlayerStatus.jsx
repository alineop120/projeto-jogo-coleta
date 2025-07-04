// File: frontend/src/components/Player/PlayerStatus.jsx
import React, { useContext } from "react";
import { GameContext } from "@context/GameContext";

export default function PlayerStatus() {
    const { player } = useContext(GameContext);

    if (!player?.pos) return <p>Carregando jogador...</p>;

    const {
        vida = "?",
        moedas = 0,
        pos: { x, y },
        inventory = [],
    } = player;

    return (
        <div style={{ padding: "10px", backgroundColor: "#eee", borderRadius: "5px" }}>
            <p><strong>Vida:</strong> {vida}</p>
            <p>Moedas: {player.moedas ?? 0}</p>
            <p><strong>Posição:</strong> ({x}, {y})</p>
            <p><strong>Inventário:</strong> {inventory.length ? inventory.join(", ") : "vazio"}</p>
        </div>
    );
}