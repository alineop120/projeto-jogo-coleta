import React, { useEffect } from "react";
import { useGame } from "@context/GameContext";
import { mapa } from "@components/GameMap/mapUtils";

const CELL_SIZE = 40;

export default function GameMap() {
    const { player, npcs, recursos, loading, error, movePlayer } = useGame();

    useEffect(() => {
        function handleKeyDown(e) {
            switch (e.key) {
                case "ArrowUp":
                    movePlayer("up");
                    break;
                case "ArrowDown":
                    movePlayer("down");
                    break;
                case "ArrowLeft":
                    movePlayer("left");
                    break;
                case "ArrowRight":
                    movePlayer("right");
                    break;
                default:
                    break;
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [movePlayer]);

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
                    const isPlayer = player.pos.x === x && player.pos.y === y;
                    const npcHere = npcs.find((npc) => npc.localizacao.x === x && npc.localizacao.y === y);
                    const recursoHere = recursos.find((r) => r.x === x && r.y === y);

                    const color = cel === "X" ? "gray" : cel === "L" ? "#ADD8E6" : cel === "G" ? "#FFD700" : "white";

                    let emoji = "";
                    if (cel === "L") emoji = "🏪";
                    else if (cel === "G") emoji = "🛡️";
                    else if (cel === "X") emoji = "🚧";

                    return (
                        <div
                            key={`${x}-${y}`}
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
                            }}
                        >
                            {emoji && <span>{emoji}</span>}
                            {isPlayer && <span title="Jogador">🚶‍♂️</span>}
                            {npcHere && <span title={`NPC: ${npcHere.nome}`}>🤖</span>}
                            {recursoHere && <span title={`Recurso: ${recursoHere.tipo}`}>{recursoHere.tipo === "madeira" ? "🌳" : "⛏️"}</span>}
                        </div>
                    );
                })
            )}
        </div>
    );
}
