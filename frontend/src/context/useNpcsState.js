// useNpcsState.js
import { useState, useEffect } from 'react';
import { mapa } from '@components/GameMap/mapUtils';

export function useNpcsState(loading, posLoja, posGuilda, lojaOcupadaPor, guildaOcupadaPor, setLojaOcupadaPor, setGuildaOcupadaPor) {
    const [npcs, setNpcs] = useState([]);

    // Efeito para liberar vaga quando NPC sai do local
    useEffect(() => {
        npcs.forEach(npc => {
            if (npc.status !== "dentro") {
                if (lojaOcupadaPor === npc.id) setLojaOcupadaPor(null);
                if (guildaOcupadaPor === npc.id) setGuildaOcupadaPor(null);
            }
        });
    }, [npcs, lojaOcupadaPor, guildaOcupadaPor, setLojaOcupadaPor, setGuildaOcupadaPor]);

    useEffect(() => {
        if (loading) return;

        const interval = setInterval(() => {
            setNpcs(prevNpcs => {
                return prevNpcs.map(npc => {
                    const lojaOcupada = lojaOcupadaPor !== null;
                    const guildaOcupada = guildaOcupadaPor !== null;

                    if (npc.status === "dentro") {
                        npc.cycles = (npc.cycles || 0) + 1;
                        if (npc.cycles >= 5) {
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

                        if (npc.localizacao.x === destinoPos.x && npc.localizacao.y === destinoPos.y) {
                            if ((npc.destino === "Loja" && !lojaOcupada) || (npc.destino === "Guilda" && !guildaOcupada)) {
                                if (npc.destino === "Loja") setLojaOcupadaPor(npc.id);
                                else setGuildaOcupadaPor(npc.id);
                                return { ...npc, status: "dentro", cycles: 0 };
                            }
                            return { ...npc, status: "esperando" };
                        }

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
    }, [loading, posLoja, posGuilda, lojaOcupadaPor, guildaOcupadaPor, setLojaOcupadaPor, setGuildaOcupadaPor]);

    return { npcs, setNpcs };
}
