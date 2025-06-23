// src/components/GameMap/mapUtils.js

import { mapa } from '@components/GameMap/map';

export { mapa };

// Função para achar posições intransitáveis (ex: 'X' no mapa)
export function acharTilesIntransitaveis() {
    const posicoes = [];
    for (let y = 0; y < mapa.height; y++) {
        for (let x = 0; x < mapa.width; x++) {
            if (mapa.tiles[y][x] === 'X') {
                posicoes.push({ x, y });
            }
        }
    }
    return posicoes;
}

// Função para achar a primeira posição intransitável
export function acharPrimeiroIntransitavel() {
    for (let y = 0; y < mapa.height; y++) {
        for (let x = 0; x < mapa.width; x++) {
            if (mapa.tiles[y][x] === 'X') {
                return { x, y };
            }
        }
    }
    return null;
}