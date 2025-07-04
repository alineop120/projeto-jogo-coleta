// File: frontend/src/api/playerApi.js
import { getJSON, postJSON } from "../services/fetchUtils";

const BASE_URL = "http://localhost:5000/api/player";

export const getPlayerStatus = () => getJSON(`${BASE_URL}/status`);

export const moverPlayer = (newPos) =>
    postJSON(`${BASE_URL}/mover`, { position: newPos });

export const comprarItem = (item) =>
    postJSON(`${BASE_URL}/comprar`, { item });

export const trocarRecursos = () =>
    postJSON(`${BASE_URL}/trocar`);
