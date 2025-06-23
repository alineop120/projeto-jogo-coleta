//src/components/Recursos/RecursosList.jsx
import React, { useContext } from 'react';
import { GameContext } from '@context/GameContext';

export default function RecursosList() {
    const { recursos } = useContext(GameContext);

    return (
        <div className="recursos-list">
            <h3>Recursos Próximos</h3>
            <ul>
                {recursos?.map(recurso => (
                    <li key={`${recurso.tipo}-${recurso.x}-${recurso.y}`}>
                        {recurso.tipo} - Posição: ({recurso.x}, {recurso.y})
                    </li>
                ))}
            </ul>
        </div>
    );
}