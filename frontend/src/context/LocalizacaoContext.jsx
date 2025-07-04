// File: frontend/src/components/Player/PlayerInventory.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const LocalizacaoContext = createContext();

export function LocalizacaoProvider({ children, playerPos, posLojas, posGuildas }) {
  const [localizacaoEspecial, setLocalizacaoEspecial] = useState(null);

  useEffect(() => {
    function verificarLocalizacaoEspecial(posPlayer, posicoes) {
      return posicoes.some(pos => pos.x === posPlayer.x && pos.y === posPlayer.y);
    }

    if (verificarLocalizacaoEspecial(playerPos, posLojas)) {
      setLocalizacaoEspecial('loja');
    } else if (verificarLocalizacaoEspecial(playerPos, posGuildas)) {
      setLocalizacaoEspecial('guilda');
    } else {
      setLocalizacaoEspecial(null);
    }
  }, [playerPos, posLojas, posGuildas]);

  return (
    <LocalizacaoContext.Provider value={{ localizacaoEspecial }}>
      {children}
    </LocalizacaoContext.Provider>
  );
}

export function useLocalizacao() {
  return useContext(LocalizacaoContext);
}