// File: frontend/src/components/UI/PainelInteracao.jsx

import React, { useContext } from 'react';
import Loja from '@components/LojaGuilda/Loja';
import Guilda from '@components/LojaGuilda/Guilda';
import { GameContext } from '@context/GameContext';
import ErrorBoundary from '@components/ErrorBoundary';

export default function PainelInteracao() {
    const { localizacaoEspecial } = useContext(GameContext);

    if (!localizacaoEspecial) return null;

    return (
        <div>
            <ErrorBoundary>
                {localizacaoEspecial === 'loja' && <Loja />}
                {localizacaoEspecial === 'guilda' && <Guilda />}
            </ErrorBoundary>
        </div>
    );
}
