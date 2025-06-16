import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export default function NPCMap() {
    const { npcs } = useContext(GameContext);

    const mapStyle = {
        position: "relative",
        width: "500px",
        height: "300px",
        border: "2px solid #333",
        backgroundColor: "#e0f7fa",
        margin: "20px auto",
    };

    const npcStyle = (x, y) => ({
        position: "absolute",
        left: x,
        top: y,
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "12px",
        cursor: "pointer",
        userSelect: "none",
    });

    return (
        <div style={mapStyle}>
            {npcs.map((npc, index) => {
                const x = npc.localizacao?.x || 0;
                const y = npc.localizacao?.y || 0;

                return (
                    <div key={npc.id || index} style={npcStyle(x, y)} title={npc.nome || `NPC ${index}`}>
                        {npc.nome ? npc.nome[0].toUpperCase() : "N"}
                    </div>
                );
            })}
        </div>
    );
}
