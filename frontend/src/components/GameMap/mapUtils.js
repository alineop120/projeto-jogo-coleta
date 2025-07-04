// File: frontend/src/components/GameMap/mapUtils.js

import { mapa } from '@components/GameMap/map';

export { mapa };

// Encontra todas as posições de um tipo específico (ex: 'L', 'G', etc.)
export function acharPosicoes(tipo) {
    const posicoes = [];
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === tipo) {
                posicoes.push({ x, y });
            }
        }
    }
    return posicoes;
}

// Encontra a primeira posição de um tipo específico (usado se quiser só 1)
export function acharPrimeiraPosicao(tipo) {
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === tipo) {
                return { x, y };
            }
        }
    }
    return null;
}

// Encontra todas as posições intransitáveis (parede, obstáculo etc.)
export function acharTilesIntransitaveis() {
    const posicoes = [];
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === 'X') {
                posicoes.push({ x, y });
            }
        }
    }
    return posicoes;
}

// Encontra a primeira posição intransitável (caso necessário)
export function acharPrimeiroIntransitavel() {
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === 'X') {
                return { x, y };
            }
        }
    }
    return null;
}
