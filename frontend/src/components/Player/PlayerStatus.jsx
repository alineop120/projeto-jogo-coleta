// src/components/Player/PlayerStatus.jsx
import React, { useContext } from "react";
import { GameContext } from "@context/GameContext";

export default function PlayerStatus() {
    const { player } = useContext(GameContext);

    if (!player || !player.pos) return <p>Carregando jogador...</p>;

    return (
        <div style={{ padding: "10px", backgroundColor: "#eee" }}>
            <p>Vida: {player.vida ?? "?"}</p>
            <p>Moedas: {player.moedas ?? 0}</p>
            <p>Posição: ({player.pos.x}, {player.pos.y})</p>
            <p>Inventário: {player.inventory?.join(", ") || "vazio"}</p>
        </div>
    );
}
