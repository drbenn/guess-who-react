import { useState, useContext, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import { characters } from './assets/data/characters';
import { questions } from './assets/data/questions'
import * as gameService from './services/game.service'

// UserContext provides the value from the user.context provider where value={value}
// where the value is the current user as well as the setter setCurrentUser
import { GameContext } from './contexts/game.context'




function App() {



  // STATE
  const [secretPerson, setSecretPerson] = useState("");
  const [activeMarker, setActiveMarker] = useState("dismiss");
  const [guesses, setGuesses] = useState([0,0,0,0,0]);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [primaryQuestion, setPrimaryQuestion] = useState("");
  const [secondaryQuestions, setSecondaryQuestions] = useState([]);
  const [helperResponse, setHelperResponse] = useState("");

  // assists with resetting random key generation to re-render for response fly animation if multiple wrong questions asked in a row
  let storedIncorrectResponseQuestion;
  // set secret character at beginning of game - useEffect is similar to ngOnInit
  useEffect(() => {
    setSecretPerson(() => gameService.randomGameCharacter());    
  }, [])


  // gameService.questionResponse('sex','m');
  // let selectedPrimaryQuestion;
  // let selectedQuestionObject;
  // let secondOption;
  // const { currentGame } = useContext(GameContext);
  // const statePrimaryQuestion = useContext(GameContext);

  // const { setCurrentGame } = useContext(GameContext);

  // let onSelectChange = (event) => {
  //   console.log(event.target.value);
  //   selectedPrimaryQuestion = event.target.value;

  //   setCurrentGame(selectedPrimaryQuestion)


  //   for (const [key,value] of Object.entries(questions)) {
  //     // console.log({key}, {value});
  //     if (value.primaryValue === selectedPrimaryQuestion) {
  //       selectedQuestionObject = value;
  //       console.log(selectedQuestionObject);

  //     }
  //   }

  //   // if (!selectedQuestionObject.secondaryOptions) {
  //   //   console.log('HIT');
  //   //   secondOption = '';
  //   // } else {
  //   //   secondOption = 
  //   // }
  // }

function testBtn() {
  console.log('%cCurrent State', `color: goldenrod; background: #3d09bf; font-size:1.2rem; font-family: Helvetica; 
                                  font-weight: bolder; border: 2px solid #1cce69; border-radius: 5px; padding:0.5rem;
                                  margin: 1rem; width: 40rem`);
    console.log('Secret Person: ', secretPerson);
    console.log('ActiveMarker: ', activeMarker);
    console.log('PrimaryQuestion: ', primaryQuestion);
    console.log('SecondaryQuestions: ', secondaryQuestions);
}

function dismissToggle() {
  setActiveMarker(() => "dismiss");    
}

function guessToggle() {
  setActiveMarker(() => "guess");   
}

function updateQuestions($event) {
  let primaryQuestion = $event.target.value
  setPrimaryQuestion(() => primaryQuestion)

  let secondaryQuestions = questions.filter((obj) => obj.primaryValue === primaryQuestion)[0].secondaryOptions
  setSecondaryQuestions(() => secondaryQuestions)
  console.log(secondaryQuestions);
  // secondOptionsDisplay = secondaryQuestions.map((el) => <option key={el} value={el}>{el}</option>)
}

function submitQuestion($event) {
  let secondQuestionValue = $event.target.value
  let guess = secondQuestionValue;

  console.log(guess);
  console.log(primaryQuestion);
  console.log(secretPerson);
  let secretAttribute = secretPerson[primaryQuestion]
  console.log(secretAttribute);
  let isGuessCorrect = secretAttribute === guess;
  console.log(isGuessCorrect);


  if (isGuessCorrect) {
    setHelperResponse('Yes! The person has this trait!')
    console.log(helperResponse.length);
    setGuesses((guesses) => {
      let newGuessArray = guesses
      newGuessArray[currentGuess] = 1;
      return newGuessArray
    });

  }
  if (!isGuessCorrect) {
    console.log(guess);
    console.log(storedIncorrectResponseQuestion);
    setHelperResponse('No! The person does NOT have this trait...')
    storedIncorrectResponseQuestion = guess;
    console.log(helperResponse.length);
    setGuesses((guesses) => {
      let newGuessArray = guesses
      newGuessArray[currentGuess] = 2;
      return newGuessArray
    });
  }
  setCurrentGuess((currentGuess) => currentGuess + 1)
  // console.log(currentGuess);
  // console.log(guesses);

  // IF currentGuess = 5 - all attemps spent - IF NO WIN on try 5, OTHERWISE TRIGGER GAME OVER

}


  return (
    <div className="App">
      <div className='title-group'>
        <div className='shift-lines'>
          <div className='line-1'>
            <div className='red-title-1'>Guess</div> 
            <div className='blue-title-1'>Guess</div>
          </div>
          <div className='line-2'>
            <div className='red-title-2'>Who</div> 
            <div className='blue-title-2'>Who</div>
          </div>
          <div className='line-3'>
            <div className='red-title-3'>?</div>
            <div className='blue-title-3'>?</div>
          </div>
        </div>
      </div>
      <button onClick={testBtn}>TEST</button>
      <div className='guesses-container'>
      {guesses.map((guess) => {
          if (guess === 0) {
            return (
              <div key={Math.random()} className='guess-box'></div>
            )
          }
          if (guess === 1) {
            return (
              <div key={Math.random()} className='guess-box response-yes'>&#10004;</div>
            )
          }
          if (guess === 2) {
            return (
              <div key={Math.random()} className='guess-box response-no'>X</div>
            )
          }
            return null
          })}
      </div>



      {/* {console.log(questions)} */}
      <div className='select-flex'>
        <div className='ask-text'>
          Ask:
        </div>

        <div>
          {/* <select className="custom-select" name="questions" id="questions" onChange={onSelectChange}> */}
          <select className="custom-select" name="questions" id="questions" onChange={event => updateQuestions(event)}>
            <option disabled selected hidden  >Question Topic...</option>
            {questions.map(question => (
                  <option value={question.primaryValue}>{question.primaryQuestion}</option>
            ))}

          </select>

        </div>

        <div>
          <select className="custom-select" name="questions" id="secondaryQuestions" onChange={event => submitQuestion(event)}>
            <option disabled selected hidden>Topic Options...</option>
              {secondaryQuestions.map(question => (
                  <option value={question}>{question}</option>
            ))}

          </select>
        </div>
        <button onClick={dismissToggle}>Dismiss</button>
          <button onClick={guessToggle}>Guess</button>
      </div>
      <div>
        {helperResponse && helperResponse.length < 32 && 
          <div key={Math.random()} className='response response-yes'>
          {helperResponse}
          </div>
        }
        {/* NEED TO FIX SO ANIMATES IF MULTIPLE WRONG RESPONSE IN A ROW */}
        {helperResponse && helperResponse.length > 32  &&
          <div key={Math.random()} className='response response-no'>
          {helperResponse}
          </div>
        }
      </div>
      <CardList characters={characters} onChange={value => console.log(value)} /> 
    </div>
  );
}

export default App;
