// File: frontend/src/components/Recursos/RecursosList.jsx
import React, { useContext } from 'react';
import { GameContext } from '@context/GameContext';

export default function RecursosList() {
    const { recursos } = useContext(GameContext);

    if (!recursos || recursos.length === 0) {
        return <p>Nenhum recurso disponível no momento.</p>;
    }

    return (
        <div className="recursos-list" style={{ padding: '10px', backgroundColor: '#f0f8ff' }}>
            <h3>Recursos no Mapa</h3>
            <ul>
                {recursos.map(({ tipo, x, y }) => (
                    <li key={`${tipo}-${x}-${y}`}>
                        {tipo === 'madeira' ? '🌳 Madeira' : tipo === 'pedra' ? '⛏️ Pedra' : tipo} 
                        — Posição: ({x}, {y})
                    </li>
                ))}
            </ul>
        </div>
    );
}