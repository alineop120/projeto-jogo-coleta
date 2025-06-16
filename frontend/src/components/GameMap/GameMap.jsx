import React, { useContext } from 'react';
import { GameContext } from '@context/GameContext';
import { mapa } from './map';
import Loja from "../LojaGuilda/Loja";
import Guilda from '../LojaGuilda/Guilda';

const CELL_SIZE = 40;

export default function GameMap() {
    const { player, npcs, recursos, loading, error } = useContext(GameContext);
    const playerPos = player?.pos ?? { x: 0, y: 0 };

    if (error) return <div className="error">Erro: {error}</div>;
    if (loading) return <div className="loading">Carregando mapa...</div>;
    if (!player?.pos) return <div>Dados do jogador inválidos</div>;

    const safeNpcs = Array.isArray(npcs) ? npcs : [];
    const safeRecursos = Array.isArray(recursos) ? recursos : [];

    const currentCell = mapa[playerPos.y]?.[playerPos.x];

    return (
        <div>
            {/* Grid do jogo */}
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${mapa[0].length}, ${CELL_SIZE}px)`,
            }}>
                {mapa.flatMap((row, y) =>
                    row.map((cel, x) => {
                        const isPlayer = playerPos.x === x && playerPos.y === y;
                        const npcHere = safeNpcs.find(npc => npc?.localizacao?.x === x && npc?.localizacao?.y === y);
                        const recursoHere = safeRecursos.find(res => res?.x === x && res?.y === y);

                        const color = cel === "X" ? "gray"
                            : cel === "L" ? "#ADD8E6"
                                : cel === "G" ? "#FFD700"
                                    : "white";

                        // Define o emoji para cada tipo de célula
                        let emoji = "";
                        if (cel === "L") emoji = "🏪";      // Loja
                        else if (cel === "G") emoji = "🛡️"; // Guilda
                        else if (cel === "X") emoji = "🚧"; // Obstáculo (opcional)

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
                                    userSelect: "none"
                                }}
                            >
                                {emoji && <span>{emoji}</span>}
                                {isPlayer && <PlayerIcon />}
                                {npcHere && <NPCIcon nome={npcHere.nome} />}
                                {recursoHere && <ResourceIcon tipo={recursoHere.tipo} />}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Mostrar Loja ou Guilda só se o jogador estiver na célula */}
            {(currentCell === "L" || currentCell === "G") && (
                <div style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    background: 'white',
                    border: '1px solid #ccc',
                    padding: '1rem',
                    zIndex: 1000,
                }}>
                    {currentCell === "L" && <Loja />}
                    {currentCell === "G" && <Guilda />}
                </div>
            )}
        </div>
    );
}

// Ícones simplificados (defina se já não existirem)
function PlayerIcon() {
    return <div style={iconStyle} title="Jogador">🚶‍♂️</div>;
}
function NPCIcon({ nome }) {
    return <div style={iconStyle} title={`NPC: ${nome}`}>🤖</div>;
}
function ResourceIcon({ tipo }) {
    return <div style={iconStyle} title={`Recurso: ${tipo}`}>
        {tipo === 'madeira' ? '🌳' : '⛏️'}
    </div>;
}

const iconStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5em",
    pointerEvents: "none",
};
