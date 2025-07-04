// File: frontend/src/components/Player/PlayerInventory.jsx
import React, { useContext } from "react";
import { GameContext } from "@context/GameContext";

export default function PlayerInventory() {
    const { player } = useContext(GameContext);

    if (!player) return <p>Carregando inventário...</p>;

    const inventory = player.inventory ?? [];

    return (
        <div style={{ padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
            <h4>Inventário</h4>
            {inventory.length > 0 ? (
                <ul style={{ paddingLeft: "20px" }}>
                    {inventory.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>Inventário vazio</p>
            )}
        </div>
    );
}
