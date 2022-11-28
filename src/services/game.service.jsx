import { characters } from '../assets/data/characters';


export function randomGameCharacter() {
  const chars = characters;
  const randomCharacterIndex = Math.round(characters.length * Math.random())
  const gameCharacter = chars[randomCharacterIndex]
  return gameCharacter;
}

