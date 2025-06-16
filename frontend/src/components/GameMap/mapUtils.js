import { mapa } from './mapa'; // ou o caminho correto

export function acharPosicao(tipo) {
    for (let y = 0; y < mapa.length; y++) {
        for (let x = 0; x < mapa[y].length; x++) {
            if (mapa[y][x] === tipo) return { x, y };
        }
    }
    return null;
}
