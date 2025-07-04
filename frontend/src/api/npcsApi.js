// File: frontend/src/api/npcsApi.js

import { getJSON } from "../services/fetchUtils";

const BASE_URL = "http://localhost:5000/api/npcs";

export const getNPCs = () => getJSON(BASE_URL);