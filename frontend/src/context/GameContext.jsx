import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { mapa } from "@components/GameMap/mapUtils";

function acharPosicoes(tipo) {
    const posicoes = [];
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === tipo) posicoes.push({ x, y });
        }
    }
    return posicoes;
}

export const GameContext = createContext();

export function GameProvider({ children }) {
    const [player, setPlayer] = useState({ pos: { x: 0, y: 0 }, inventory: [] });
    const [npcs, setNpcs] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [localizacaoEspecial, setLocalizacaoEspecial] = useState(null);

    const posLojas = useMemo(() => acharPosicoes("L"), []);
    const posGuildas = useMemo(() => acharPosicoes("G"), []);

    useEffect(() => {
        async function loadGameData() {
            try {
                setLoading(true);

                // Aqui a fakeApi, pode substituir pela API real
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

        loadGameData();
    }, []);

    // Atualiza NPCs andando em direção a lojas/guildas a cada 1s
    useEffect(() => {
        const interval = setInterval(() => {
            setNpcs((prevNpcs) =>
                prevNpcs.map((npc) => {
                    const andarAleatorio = Math.random() < 0.4; // 40% vagueia
                    const { x: nx, y: ny } = npc.localizacao;

                    if (andarAleatorio) {
                        const direcoes = [
                            { dx: 0, dy: -1 },
                            { dx: 0, dy: 1 },
                            { dx: -1, dy: 0 },
                            { dx: 1, dy: 0 },
                        ];
                        const movimento = direcoes[Math.floor(Math.random() * direcoes.length)];
                        const proxX = nx + movimento.dx;
                        const proxY = ny + movimento.dy;

                        if (mapa[proxY] && mapa[proxY][proxX] && mapa[proxY][proxX] !== "X") {
                            return {
                                ...npc,
                                localizacao: { x: proxX, y: proxY },
                            };
                        }
                        return npc;
                    } else {
                        const destino = npc.destino === "Loja" ? posLojas[0] : posGuildas[0];
                        if (!destino) return npc;

                        const dx = destino.x - nx;
                        const dy = destino.y - ny;
                        const proxX = nx + Math.sign(dx);
                        const proxY = ny + Math.sign(dy);

                        if (mapa[proxY] && mapa[proxY][proxX] && mapa[proxY][proxX] !== "X") {
                            return {
                                ...npc,
                                localizacao: { x: proxX, y: proxY },
                            };
                        }
                        return npc;
                    }
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [posLojas, posGuildas]);

    // Função para mover jogador respeitando limites, obstáculos e semaforização
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

            // Verifica se tem NPC no local novo
            const npcNoLocal = npcs.some(
                (npc) => npc.localizacao.x === newX && npc.localizacao.y === newY
            );
            if (npcNoLocal) return prev;

            // Verifica se o local novo é uma loja ou guilda e se está ocupado
            const pos = { x: newX, y: newY };
            if (verificarLocalizacaoEspecial(pos, posLojas) && estaOcupado("loja", pos)) {
                return prev; // Loja ocupada, bloqueia movimento
            }
            if (verificarLocalizacaoEspecial(pos, posGuildas) && estaOcupado("guilda", pos)) {
                return prev; // Guilda ocupada, bloqueia movimento
            }

            return { ...prev, pos: { x: newX, y: newY } };
        });
    };

    // Verifica se uma posição está dentro de uma lista de posições especiais
    function verificarLocalizacaoEspecial(posPlayer, posicoes) {
        return posicoes.some(pos => pos.x === posPlayer.x && pos.y === posPlayer.y);
    }

    // Atualiza localizacaoEspecial sempre que o player se move
    useEffect(() => {
        if (verificarLocalizacaoEspecial(player.pos, posLojas)) {
            setLocalizacaoEspecial("loja");
        } else if (verificarLocalizacaoEspecial(player.pos, posGuildas)) {
            setLocalizacaoEspecial("guilda");
        } else {
            setLocalizacaoEspecial(null);
        }
    }, [player.pos, posLojas, posGuildas]);

    // Verifica se loja/guilda está ocupada por algum NPC
    function estaOcupado(tipoLocal, posPlayer) {
        const posicoes = tipoLocal === "loja" ? posLojas : posGuildas;
        if (!verificarLocalizacaoEspecial(posPlayer, posicoes)) return false;

        return npcs.some(
            npc => npc.localizacao.x === posPlayer.x &&
                   npc.localizacao.y === posPlayer.y &&
                   npc.destino.toLowerCase() === tipoLocal
        );
    }

    return (
        <GameContext.Provider
            value={{
                player,
                npcs,
                recursos,
                loading,
                error,
                movePlayer,
                localizacaoEspecial,
                posLojas,
                posGuildas,
                estaOcupado,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}

// MOCK API
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
