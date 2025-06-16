import React, { useContext } from 'react';
import { GameContext } from "../../context/GameContext";

export default function NPCList() {
    const { npcs } = useContext(GameContext);

    return (
        <div className="npc-list">
            <h3>NPCs no Mapa</h3>
            <ul>
                {npcs?.map(npc => (
                    <li key={`npc-${npc.id}`}> {/* Key única baseada no ID */}
                        {npc.nome} - Posição: ({npc.localizacao?.x}, {npc.localizacao?.y})
                    </li>
                ))}
            </ul>
        </div>
    );
}