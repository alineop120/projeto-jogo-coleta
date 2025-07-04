// File: frontend/src/components/Player/PlayerMovement.jsx
import { useEffect, useContext } from 'react';
import { GameContext } from '@context/GameContext';

export default function PlayerMovement() {
    const { movePlayer } = useContext(GameContext);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();

            const directions = {
                w: 'up',
                arrowup: 'up',
                s: 'down',
                arrowdown: 'down',
                a: 'left',
                arrowleft: 'left',
                d: 'right',
                arrowright: 'right',
            };

            const direction = directions[key];
            if (direction) {
                e.preventDefault();
                movePlayer(direction);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer]);

    return null;
}