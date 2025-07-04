// File: frontend/src/components/GameMap/usePlayerMovement.js
import { useEffect } from "react";

export default function usePlayerMovement(movePlayer) {
    useEffect(() => {
        function handleKeyDown(e) {
            switch (e.key) {
                case "ArrowUp":
                    movePlayer("up");
                    break;
                case "ArrowDown":
                    movePlayer("down");
                    break;
                case "ArrowLeft":
                    movePlayer("left");
                    break;
                case "ArrowRight":
                    movePlayer("right");
                    break;
                default:
                    break;
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [movePlayer]);
}
