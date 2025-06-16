// GameProvider.js
import React, { useState } from 'react';
import { GameContext } from './GameContext';
import { usePlayerState } from './usePlayerState';
import { useNpcsState } from './useNpcsState';
import { acharPosicao } from './mapUtils'; // a função para achar posições no mapa

export function GameProvider({ children }) {
    const [lojaOcupadaPor, setLojaOcupadaPor] = useState(null);
    const [guildaOcupadaPor, setGuildaOcupadaPor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const posLoja = acharPosicao("L");
    const posGuilda = acharPosicao("G");

    const { player, setPlayer, movePlayer } = usePlayerState(
        posLoja, posGuilda, lojaOcupadaPor, guildaOcupadaPor, setLojaOcupadaPor, setGuildaOcupadaPor
    );

    const { npcs, setNpcs } = useNpcsState(
        loading, posLoja, posGuilda, lojaOcupadaPor, guildaOcupadaPor, setLojaOcupadaPor, setGuildaOcupadaPor
    );

    return (
        <GameContext.Provider value={{
            player,
            setPlayer,
            movePlayer,
            npcs,
            setNpcs,
            loading,
            setLoading,
            error,
            setError,
            lojaOcupadaPor,
            guildaOcupadaPor,
        }}>
            {children}
        </GameContext.Provider>
    );
}
