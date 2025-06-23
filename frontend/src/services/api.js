import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const ensureTrailingSlash = (url) => (url.endsWith('/') ? url : url + '/');

const parseJSONResponse = async (response) => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro HTTP ${response.status}: ${text.substring(0, 100)}...`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Resposta não é JSON: ${text.substring(0, 100)}...`);
    }
    return response.json();
};

export const getPlayer = async () => {
    try {
        const response = await fetch(ensureTrailingSlash(`${API_BASE}/player`));
        const data = await parseJSONResponse(response);
        console.log('getPlayer response:', data);
        return data;
    } catch (err) {
        console.error('Erro na requisição getPlayer:', err);
        throw err;
    }
};

export const getNPCs = async () => {
    try {
        const response = await fetch(ensureTrailingSlash(`${API_BASE}/npcs`));
        return await parseJSONResponse(response);
    } catch (err) {
        console.error('Erro na requisição getNPCs:', err);
        throw err;
    }
};

export const getRecursos = async () => {
    try {
        const response = await fetch(ensureTrailingSlash(`${API_BASE}/recursos`));
        return await parseJSONResponse(response);
    } catch (err) {
        console.error('Erro na requisição getRecursos:', err);
        throw err;
    }
};

export const moverPlayer = async (newPos) => {
    try {
        const response = await fetch(`${API_BASE}/player/mover`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ position: newPos }),
        });

        if (!response.ok) {
            throw new Error('Erro na rede');
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição moverPlayer:', err);
        throw err;
    }
};

export const comprarItem = async (item) => {
    try {
        const response = await fetch(`${API_BASE}/player/comprar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item }),
        });

        if (!response.ok) {
            throw new Error('Erro na rede');
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição comprarItem:', err);
        throw err;
    }
};

export const trocarRecursos = async () => {
    try {
        const response = await fetch(`${API_BASE}/player/trocar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Erro na rede');
        }

        return await response.json();
    } catch (err) {
        console.error('Erro na requisição trocarRecursos:', err);
        throw err;
    }
};

export const getMapa = async () => {
    try {
        const response = await fetch(ensureTrailingSlash(`${API_BASE}/mapa`));
        return await parseJSONResponse(response);
    } catch (err) {
        console.error('Erro ao buscar o mapa:', err);
        throw err;
    }
};
