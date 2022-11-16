import { createContext, useState } from 'react';

// as actual value you want to access
export const GameContext = createContext({
  currentGame: null,
  setCurrentGame: () => null,
})

// Provider is the actual component - on every context there is a .provider
export const GameProvider = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const value = { currentGame, setCurrentGame };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}