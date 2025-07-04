// File: frontend/src/context/RecursosContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const RecursosContext = createContext();

export function RecursosProvider({ children }) {
    const [recursos, setRecursos] = useState([]);

    useEffect(() => {
        // Aqui pode vir de uma API real
        setRecursos([
            { tipo: 'madeira', x: 3, y: 5 },
            { tipo: 'pedra', x: 7, y: 2 },
        ]);
    }, []);

    return (
        <RecursosContext.Provider value={{ recursos }}>
            {children}
        </RecursosContext.Provider>
    );
}

export function useRecursos() {
    return useContext(RecursosContext);
}