// usePlayerState.js
import { useState } from 'react';
import { mapa } from '@components/GameMap/mapUtils';

export function usePlayerState(posLoja, posGuilda, lojaOcupadaPor, guildaOcupadaPor, setLojaOcupadaPor, setGuildaOcupadaPor) {
    const [player, setPlayer] = useState({ pos: { x: 0, y: 0 }, inventory: [] });

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

    return { player, setPlayer, movePlayer };
}
