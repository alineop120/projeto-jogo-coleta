import React, { useContext } from 'react';
import { GameContext } from '@context/GameContext';
import GameMap from '@components/GameMap/GameMap';
import PlayerMovement from '@components/Player/PlayerMovement';
import NPCList from '@components/NPCs/NPCList';
import RecursosList from '@components/Recursos/RecursosList';
import ErrorBoundary from '@components/ErrorBoundary';

export default function App() {
    const { loading, error } = useContext(GameContext);

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        <div className="app-container">
            <h1>Jogo de Coleta de Recursos</h1>
            
            <ErrorBoundary>
                <GameMap />
            </ErrorBoundary>
            
            <PlayerMovement />
            
            <ErrorBoundary>
                <NPCList />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <RecursosList />
            </ErrorBoundary>
        </div>
    );
}