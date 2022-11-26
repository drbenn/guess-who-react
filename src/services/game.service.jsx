import { characters } from '../assets/data/characters';
import { questions } from '../assets/data/questions'

// function GameService() {

// }


// export default GameService;



export function randomGameCharacter() {
  const chars = characters;
  const randomCharacterIndex = Math.round(characters.length * Math.random())
  const gameCharacter = chars[randomCharacterIndex]
  // console.log(gameCharacter);
  // push gameCharacter to state
  return gameCharacter;
}

export function questionResponse(topic,option){
  let char = this.randomCharacter;
  // console.log('in quesResponse func');
  // console.log(char);
  // console.log('its actually still available? -- NO -- will need to take from state');
  // console.log(char.sex);
  // console.log(char.sex.value);

}