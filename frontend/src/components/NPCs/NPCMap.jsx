// File: frontend/src/components/NPCs/NPCMap.jsx
import React from "react";
import { useGame } from "@context/GameContext";

const CELL_SIZE = 40;

const mapStyle = {
    position: "relative",
    width: `${CELL_SIZE * 10}px`,
    height: `${CELL_SIZE * 10}px`,
    border: "2px solid #333",
    backgroundColor: "#e0f7fa",
    margin: "20px auto",
};

const npcStyle = (x, y) => ({
    position: "absolute",
    left: `${x * CELL_SIZE}px`,
    top: `${y * CELL_SIZE}px`,
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    backgroundColor: "red",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.9rem",
    cursor: "pointer",
    userSelect: "none",
});

export default function NPCMap() {
    const { npcs } = useGame();

    return (
        <div style={mapStyle} role="presentation">
            {npcs.map(({ id, nome, localizacao }, index) => {
                const x = localizacao?.x ?? 0;
                const y = localizacao?.y ?? 0;

                return (
                    <div
                        key={id || index}
                        style={npcStyle(x, y)}
                        title={nome || `NPC ${index}`}
                        aria-label={`NPC ${nome || index}`}
                    >
                        {nome?.charAt(0).toUpperCase() || "N"}
                    </div>
                );
            })}
        </div>
    );
}