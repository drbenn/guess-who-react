import { characters } from '../assets/data/characters';
import { questions } from '../assets/data/questions'

// function GameService() {

// }


// export default GameService;
let randomCharacter;


export function randomGameCharacter() {
  const chars = characters;
  const randomCharacterIndex = Math.round(characters.length * Math.random())
  const gameCharacter = chars[randomCharacterIndex]
  this.randomCharacter = gameCharacter;
  console.log(gameCharacter);
  // push gameCharacter to state
}

export function questionResponse(topic,option){
  let char = this.randomCharacter;
  console.log('in quesResponse func');
  console.log(char);
  console.log('its actually still available?');
  console.log(char.sex);

}