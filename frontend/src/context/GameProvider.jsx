import React, { useMemo } from 'react';
import { PlayerProvider, usePlayer } from './PlayerContext';
import { NPCProvider, useNPC } from './NPCContext';
import { RecursosProvider } from './RecursosContext';
import { LocalizacaoProvider } from './LocalizacaoContext';
import { mapa, acharPosicoes } from '@components/GameMap/mapUtils';

export function GameProvider({ children }) {
    return (
        <PlayerProvider>
            <NPCProvider>
                <RecursosProvider>
                    <LocalizacaoWrapper>
                        {children}
                    </LocalizacaoWrapper>
                </RecursosProvider>
            </NPCProvider>
        </PlayerProvider>
    );
}

// Componente wrapper para passar props ao LocalizacaoProvider
function LocalizacaoWrapper({ children }) {
    const { player } = usePlayer();

    const posLojas = useMemo(() => acharPosicoes('L'), []);
    const posGuildas = useMemo(() => acharPosicoes('G'), []);

    return (
        <LocalizacaoProvider
            playerPos={player.pos}
            posLojas={posLojas}
            posGuildas={posGuildas}
        >
            {children}
        </LocalizacaoProvider>
    );
}