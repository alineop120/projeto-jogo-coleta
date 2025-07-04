// File: frontend/src/App.jsx

import React, { useContext } from 'react';
import { GameContext } from '@context/GameContext';
import GameMap from '@components/GameMap/GameMap';
import PlayerMovement from '@components/Player/PlayerMovement';
import PlayerStatus from '@components/Player/PlayerStatus';
import PainelInteracao from '@components/UI/PainelInteracao';
import ErrorBoundary from '@components/ErrorBoundary';

import './styles/app.css';

export default function App() {
    const { loading, error } = useContext(GameContext);

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        <div className="app-container">
            <header>
                <h1>Jogo de Coleta de Recursos</h1>
            </header>

            <main>
                <aside className="left-panel">
                    <PlayerStatus />
                </aside>

                <section className="map-section">
                    <ErrorBoundary>
                        <GameMap />
                    </ErrorBoundary>
                    <PlayerMovement />
                </section>

                <aside className="right-panel">
                    <PainelInteracao />
                </aside>
            </main>
        </div>
    );
}