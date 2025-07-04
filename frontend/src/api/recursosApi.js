// File: frontend/src/api/recursosApi.js

import { getJSON } from "../services/fetchUtils";

const BASE_URL = "http://localhost:5000/api/recursos";

export const getRecursos = () => getJSON(BASE_URL);