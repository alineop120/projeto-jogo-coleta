import React, { useContext, useEffect } from 'react';
import { GameContext } from '@context/GameContext';

export default function PlayerMovement() {
    const { movePlayer } = useContext(GameContext);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    e.preventDefault();
                    movePlayer('up');
                    break;
                case 's':
                case 'arrowdown':
                    e.preventDefault();
                    movePlayer('down');
                    break;
                case 'a':
                case 'arrowleft':
                    e.preventDefault();
                    movePlayer('left');
                    break;
                case 'd':
                case 'arrowright':
                    e.preventDefault();
                    movePlayer('right');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer]);

    return null;
}