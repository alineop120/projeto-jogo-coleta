// File: frontend/src/components/LojaGuilda/Loja.jsx

import React from "react";
import { usePlayer } from "@context/PlayerContext";

const itensDisponiveis = [ /* ... */];

export default function Loja() {
    const { player, updatePlayer } = usePlayer();

    const handleCompra = (item) => {
        if (player.moedas < item.preco) {
            alert("Moedas insuficientes");
            return;
        }

        updatePlayer({
            ...player,
            moedas: player.moedas - item.preco,
            inventory: [...(player.inventory || []), item.nome],
        });
    };

    return (
        <div>
            <h3>Loja</h3>
            <p>Moedas: {player.moedas}</p>
            {/* lista de itens */}
        </div>
    );
}