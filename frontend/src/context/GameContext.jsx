import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { getPlayer, getNPCs, getRecursos } from '@services/api';
import { mapa } from '@components/GameMap/mapUtils';

// Função utilitária para achar posição de um tipo no mapa (ex: "L" para Loja)
function acharPosicao(tipo) {
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === tipo) return { x, y };
        }
    }
    return null;
}

export const GameContext = createContext();

function useGameState() {
    const [player, setPlayer] = useState({ pos: { x: 0, y: 0 }, inventory: [] });
    const [npcs, setNpcs] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para quem está dentro da loja e guilda
    const [lojaOcupadaPor, setLojaOcupadaPor] = useState(null); // null | 'player' | npc.id
    const [guildaOcupadaPor, setGuildaOcupadaPor] = useState(null);

    const posLoja = acharPosicao("L");
    const posGuilda = acharPosicao("G");

    // Fetch data (igual seu código)

    // Efeito para liberar vaga quando NPC sai do local
    useEffect(() => {
        npcs.forEach(npc => {
            if (npc.status !== "dentro") {
                if (lojaOcupadaPor === npc.id) setLojaOcupadaPor(null);
                if (guildaOcupadaPor === npc.id) setGuildaOcupadaPor(null);
            }
        });
    }, [npcs, lojaOcupadaPor, guildaOcupadaPor]);

    useEffect(() => {
        // Intervalo de movimentação NPC
        if (loading) return;

        const interval = setInterval(() => {
            setNpcs(prevNpcs => {
                return prevNpcs.map(npc => {
                    // Quem está dentro da Loja e Guilda
                    const lojaOcupada = lojaOcupadaPor !== null;
                    const guildaOcupada = guildaOcupadaPor !== null;

                    if (npc.status === "dentro") {
                        npc.cycles = (npc.cycles || 0) + 1;
                        if (npc.cycles >= 5) {
                            // Sai do local e libera a vaga
                            if (npc.destino === "Loja") setLojaOcupadaPor(null);
                            if (npc.destino === "Guilda") setGuildaOcupadaPor(null);

                            return {
                                ...npc,
                                status: "andando",
                                cycles: 0,
                                destino: npc.destino === "Loja" ? "Guilda" : "Loja"
                            };
                        }
                        return npc;
                    }

                    if (npc.status === "esperando") {
                        // Espera até o local liberar
                        if (npc.destino === "Loja" && !lojaOcupada) {
                            setLojaOcupadaPor(npc.id);
                            return { ...npc, status: "dentro", cycles: 0 };
                        }
                        if (npc.destino === "Guilda" && !guildaOcupada) {
                            setGuildaOcupadaPor(npc.id);
                            return { ...npc, status: "dentro", cycles: 0 };
                        }
                        return npc;
                    }

                    if (npc.status === "andando" && npc.destino) {
                        const destinoPos = npc.destino === "Loja" ? posLoja : posGuilda;
                        if (!destinoPos) return npc;

                        // Se chegou no destino
                        if (npc.localizacao.x === destinoPos.x && npc.localizacao.y === destinoPos.y) {
                            // Se local está livre, entra, senão espera
                            if ((npc.destino === "Loja" && !lojaOcupada) || (npc.destino === "Guilda" && !guildaOcupada)) {
                                if (npc.destino === "Loja") setLojaOcupadaPor(npc.id);
                                else setGuildaOcupadaPor(npc.id);
                                return { ...npc, status: "dentro", cycles: 0 };
                            }
                            return { ...npc, status: "esperando" };
                        }

                        // Movimento simples: andar um passo em X, depois em Y
                        let newX = npc.localizacao.x;
                        let newY = npc.localizacao.y;

                        if (npc.localizacao.x < destinoPos.x) newX += 1;
                        else if (npc.localizacao.x > destinoPos.x) newX -= 1;
                        else if (npc.localizacao.y < destinoPos.y) newY += 1;
                        else if (npc.localizacao.y > destinoPos.y) newY -= 1;

                        if (mapa[newY] && mapa[newY][newX] !== "X") {
                            return {
                                ...npc,
                                localizacao: { x: newX, y: newY }
                            };
                        }
                        return npc;
                    }
                    return npc;
                });
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [loading, posLoja, posGuilda, lojaOcupadaPor, guildaOcupadaPor]);

    // Função para mover jogador (adiciona checagem para bloquear entrada)
    const movePlayer = (direction) => {
        setPlayer(prev => {
            const { x, y } = prev.pos;
            let newX = x;
            let newY = y;

            switch (direction) {
                case 'up': newY = y - 1; break;
                case 'down': newY = y + 1; break;
                case 'left': newX = x - 1; break;
                case 'right': newX = x + 1; break;
                default: return prev;
            }

            if (!mapa[newY] || !mapa[newY][newX]) return prev;
            if (mapa[newY][newX] === "X") return prev;

            // Bloqueia entrada se local ocupado por NPC
            if (posLoja && newX === posLoja.x && newY === posLoja.y && lojaOcupadaPor && lojaOcupadaPor !== 'player') {
                return prev;
            }
            if (posGuilda && newX === posGuilda.x && newY === posGuilda.y && guildaOcupadaPor && guildaOcupadaPor !== 'player') {
                return prev;
            }

            // Atualiza estado de ocupação do local, se entrar ou sair
            if (posLoja && x === posLoja.x && y === posLoja.y && lojaOcupadaPor === 'player') {
                setLojaOcupadaPor(null);
            }
            if (posGuilda && x === posGuilda.x && y === posGuilda.y && guildaOcupadaPor === 'player') {
                setGuildaOcupadaPor(null);
            }
            if ((posLoja && newX === posLoja.x && newY === posLoja.y) || (posGuilda && newX === posGuilda.x && newY === posGuilda.y)) {
                if (posLoja && newX === posLoja.x && newY === posLoja.y) setLojaOcupadaPor('player');
                if (posGuilda && newX === posGuilda.x && newY === posGuilda.y) setGuildaOcupadaPor('player');
            }

            return {
                ...prev,
                pos: { x: newX, y: newY }
            };
        });
    };

    return useMemo(() => ({
        player,
        npcs,
        recursos,
        loading,
        error,
        setPlayer,
        movePlayer,
    }), [player, npcs, recursos, loading, error, lojaOcupadaPor, guildaOcupadaPor]);
}

export function GameProvider({ children }) {
    const gameState = useGameState();
    return <GameContext.Provider value={gameState}>{children}</GameContext.Provider>;
}

export function useGame() {
    return useContext(GameContext);
}