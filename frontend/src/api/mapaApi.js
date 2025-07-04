// File: frontend/src/api/mapaApi.js

import { getJSON } from '../services/fetchUtils';

const API_BASE = 'http://localhost:5000/api/mapa';

export const getMapa = () => getJSON(API_BASE);
