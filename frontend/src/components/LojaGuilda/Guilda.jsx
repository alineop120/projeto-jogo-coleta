//File: frontend/src/components/LojaGuilda/Guilda.jsx
import React, { useState, useCallback } from "react";
import { useGame } from "@context/GameContext";
import { comprarItem } from "@api/playerApi"; // supondo que você moveu para lá

const itensDisponiveis = [
    { nome: "Comida", preco: 10 },
    { nome: "Poção de Vida", preco: 20 },
];

export default function Guilda() {
    const { player, updatePlayer } = useGame(); // supondo que seu contexto tenha updatePlayer para setar player
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCompra = useCallback(
        async (item) => {
            setLoading(true);
            setError(null);
            try {
                const response = await comprarItem(item.nome);
                // response já é o json
                alert(response.mensagem || "Item comprado!");
                if (response.playerAtualizado) {
                    updatePlayer(response.playerAtualizado);
                }
            } catch (err) {
                console.error("Erro ao comprar item:", err);
                setError("Erro na compra.");
            } finally {
                setLoading(false);
            }
        },
        [updatePlayer]
    );

    return (
        <div style={{ padding: "10px", backgroundColor: "#e0ffe0" }}>
            <h3>Guilda</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {itensDisponiveis.map((item) => (
                    <li key={item.nome}>
                        {item.nome} – {item.preco} moedas{" "}
                        <button onClick={() => handleCompra(item)} disabled={loading}>
                            {loading ? "Comprando..." : "Comprar"}
                        </button>
                    </li>
                ))}
            </ul>
            <p>Moedas: {player?.moedas ?? 0}</p>
        </div>
    );
}