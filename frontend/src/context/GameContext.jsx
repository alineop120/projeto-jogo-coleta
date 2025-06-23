import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { mapa } from "@components/GameMap/mapUtils";

// Simula API
function fakeApi() {
    return new Promise((res) =>
        setTimeout(() => {
            res({
                player: { pos: { x: 0, y: 0 }, inventory: [] },
                npcs: [
                    { id: 1, nome: "NPC 1", localizacao: { x: 2, y: 9 }, status: "andando", destino: "Loja" },
                    { id: 2, nome: "NPC 2", localizacao: { x: 0, y: 5 }, status: "andando", destino: "Guilda" },
                ],
                recursos: [
                    { tipo: "madeira", x: 3, y: 5 },
                    { tipo: "pedra", x: 7, y: 2 },
                ],
            });
        }, 500)
    );
}

export const GameContext = createContext();

function acharPosicao(tipo) {
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === tipo) return { x, y };
        }
    }
    return null;
}

export function GameProvider({ children }) {
    const [player, setPlayer] = useState({ pos: { x: 0, y: 0 }, inventory: [] });
    const [npcs, setNpcs] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const posLoja = useMemo(() => acharPosicao("L"), []);
    const posGuilda = useMemo(() => acharPosicao("G"), []);

    // Load data once
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await fakeApi();
                setPlayer(data.player);
                setNpcs(data.npcs);
                setRecursos(data.recursos);
                setError(null);
            } catch (err) {
                setError(err.message || "Erro ao carregar dados");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setNpcs((prevNpcs) =>
                prevNpcs.map((npc) => {
                    const destino = npc.destino === "Loja" ? posLoja : posGuilda;
                    if (!destino) return npc;

                    const { x: nx, y: ny } = npc.localizacao;
                    const dx = destino.x - nx;
                    const dy = destino.y - ny;

                    // Movimento simples de um passo
                    const proxX = nx + Math.sign(dx);
                    const proxY = ny + Math.sign(dy);

                    // Evita passar por paredes ou sair do mapa
                    if (
                        mapa[proxY] &&
                        mapa[proxY][proxX] &&
                        mapa[proxY][proxX] !== "X"
                    ) {
                        return {
                            ...npc,
                            localizacao: { x: proxX, y: proxY },
                        };
                    }

                    return npc;
                })
            );
        }, 1000); // a cada 1s

        return () => clearInterval(interval);
    }, [posLoja, posGuilda]);


    // Função para mover jogador respeitando limites e obstáculos
    const movePlayer = (direction) => {
        setPlayer((prev) => {
            const { x, y } = prev.pos;
            let newX = x;
            let newY = y;

            switch (direction) {
                case "up":
                    newY = y - 1;
                    break;
                case "down":
                    newY = y + 1;
                    break;
                case "left":
                    newX = x - 1;
                    break;
                case "right":
                    newX = x + 1;
                    break;
                default:
                    return prev;
            }

            if (!mapa[newY] || !mapa[newY][newX]) return prev;
            if (mapa[newY][newX] === "X") return prev;

            return { ...prev, pos: { x: newX, y: newY } };
        });
    };

    return (
        <GameContext.Provider
            value={{
                player,
                npcs,
                recursos,
                loading,
                error,
                movePlayer,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}