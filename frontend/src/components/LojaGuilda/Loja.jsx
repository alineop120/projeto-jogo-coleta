// src/components/LojaGuilda/Loja.jsx
import React, { useContext } from "react";
import { GameContext } from "@context/GameContext";
import { comprarItem } from "@services/api";

const itensDisponiveis = [
    { nome: "Comida", preco: 10 },
    { nome: "Poção de Vida", preco: 20 },
];

export default function Loja() {
    const { player, setPlayer } = useContext(GameContext);

    const handleCompra = async (item) => {
        try {
            const { data } = await comprarItem(item.nome);
            alert(data.mensagem || "Item comprado!");
            setPlayer(data.playerAtualizado);
        } catch (error) {
            console.error("Erro ao comprar item:", error);
            alert("Erro na compra.");
        }
    };

    return (
        <div style={{ padding: "10px", backgroundColor: "#e0ffe0" }}>
            <h3>Loja</h3>
            <ul>
                {itensDisponiveis.map((item) => (
                    <li key={item.nome}>
                        {item.nome} – {item.preco} moedas{" "}
                        <button onClick={() => handleCompra(item)}>Comprar</button>
                    </li>
                ))}
            </ul>
            <p>Moedas: {player?.moedas ?? 0}</p>
        </div>
    );
}