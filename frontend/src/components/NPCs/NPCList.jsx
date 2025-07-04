// File: frontend/src/components/NPCs/NPCList.jsx
import React from 'react';
import { useGame } from '@context/GameContext';

export default function NPCList() {
    const { npcs } = useGame();

    if (!npcs?.length) return <p>Nenhum NPC no mapa.</p>;

    return (
        <div className="npc-list">
            <h3>NPCs no Mapa</h3>
            <ul>
                {npcs.map(({ id, nome, localizacao }) => (
                    <li key={`npc-${id}`}>
                        {nome} – Posição: ({localizacao?.x}, {localizacao?.y})
                    </li>
                ))}
            </ul>
        </div>
    );
}