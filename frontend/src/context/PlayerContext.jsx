// File: frontend/src/context/PlayerContext.jsx
import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [player, setPlayer] = useState({ pos: { x: 0, y: 0 }, inventory: [] });

    const movePlayer = (direction, npcs, mapa) => {
        setPlayer((prev) => {
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

            if (!mapa[newY] || !mapa[newY][newX] || mapa[newY][newX] === 'X') return prev;
            // Impede andar sobre NPC
            const npcNoLocal = npcs.some(npc => npc.localizacao.x === newX && npc.localizacao.y === newY);
            if (npcNoLocal) return prev;

            // Verifica se há recurso nesta posição
            const recursoIndex = recursos.findIndex(r => r.x === newX && r.y === newY);
            let moedasGanhas = 0;

            if (recursoIndex !== -1) {
                const tipo = recursos[recursoIndex].tipo;
                moedasGanhas = tipo === "madeira" ? 5 : tipo === "pedra" ? 10 : 0;

                // Remove o recurso coletado
                setRecursos(prev => prev.filter((_, idx) => idx !== recursoIndex));
            }

            return { ...prev, pos: { x: newX, y: newY } };
        });
    };

    return (
        <PlayerContext.Provider value={{ player, movePlayer }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}