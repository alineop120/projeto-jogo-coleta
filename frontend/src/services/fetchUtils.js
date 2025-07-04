// File: frontend/src/services/fetchUtils.js

const ensureTrailingSlash = (url) => (url.endsWith('/') ? url : url + '/');

export async function parseJSONResponse(response) {
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
}

export async function getJSON(url) {
    const response = await fetch(ensureTrailingSlash(url));
    return parseJSONResponse(response);
}

export async function postJSON(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro HTTP ${response.status}: ${text.substring(0, 100)}...`);
    }

    return response.json();
}