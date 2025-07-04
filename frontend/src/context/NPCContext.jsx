// File: frontend/src/context/NPCContext.jsx
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { mapa, acharPosicoes } from '@components/GameMap/mapUtils';

const NPCContext = createContext();

export function NPCProvider({ children }) {
    const [npcs, setNpcs] = useState([]);
    const posLojas = useMemo(() => acharPosicoes('L'), []);
    const posGuildas = useMemo(() => acharPosicoes('G'), []);

    useEffect(() => {
        const interval = setInterval(() => {
            setNpcs((prevNpcs) =>
                prevNpcs.map((npc) => {
                    const andarAleatorio = Math.random() < 0.4;
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

                        if (mapa[proxY] && mapa[proxY][proxX] && mapa[proxY][proxX] !== 'X') {
                            return { ...npc, localizacao: { x: proxX, y: proxY } };
                        }
                        return npc;
                    } else {
                        const destino = npc.destino === 'Loja' ? posLojas[0] : posGuildas[0];
                        if (!destino) return npc;

                        const dx = destino.x - nx;
                        const dy = destino.y - ny;
                        const proxX = nx + Math.sign(dx);
                        const proxY = ny + Math.sign(dy);

                        if (mapa[proxY] && mapa[proxY][proxX] && mapa[proxY][proxX] !== 'X') {
                            return { ...npc, localizacao: { x: proxX, y: proxY } };
                        }
                        return npc;
                    }
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [posLojas, posGuildas]);

    return (
        <NPCContext.Provider value={{ npcs, setNpcs }}>
            {children}
        </NPCContext.Provider>
    );
}

export function useNPC() {
    return useContext(NPCContext);
}