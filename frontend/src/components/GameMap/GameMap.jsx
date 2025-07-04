import React from "react";
import { useGame } from "@context/GameContext";
import { mapa } from "./mapUtils";
import MapCell from "./MapCell";
import usePlayerMovement from "./usePlayerMovement";

const CELL_SIZE = 40;

export default function GameMap() {
    const { player, npcs, recursos, loading, error, movePlayer } = useGame();

    usePlayerMovement(movePlayer);

    if (loading) return <div>Carregando mapa...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${mapa[0].length}, ${CELL_SIZE}px)`,
                gridGap: 1,
                border: "2px solid black",
                width: mapa[0].length * CELL_SIZE,
                userSelect: "none",
            }}
        >
            {mapa.flatMap((row, y) =>
                row.map((cel, x) => {
                    const npcHere = npcs.find((npc) => npc.localizacao.x === x && npc.localizacao.y === y);
                    const recursoHere = recursos.find((r) => r.x === x && r.y === y);

                    return (
                        <MapCell
                            key={`${x}-${y}`}
                            cel={cel}
                            x={x}
                            y={y}
                            player={player}
                            npcHere={npcHere}
                            recursoHere={recursoHere}
                        />
                    );
                })
            )}
        </div>
    );
}
