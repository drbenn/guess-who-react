import { useState, useContext, useEffect,useMemo } from 'react';
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
  const [personClicked, setPersonClicked] = useState("");
  const [activeMarker, setActiveMarker] = useState("dismiss");
  const [guesses, setGuesses] = useState([[0, false],[0, false],[0, false],[0, false],[0, false]]);
  const [currentGuess, setCurrentGuess] = useState(0);
  // Animation re-render trigger 
  const [guessTrigger, setGuessTrigger] = useState(true)
  const [primaryQuestion, setPrimaryQuestion] = useState("");
  const [secondaryQuestions, setSecondaryQuestions] = useState([]);
  const [helperResponse, setHelperResponse] = useState("");
  const [gameOutcome, setGameOutcome] = useState("wrong");
  const [endGameModal, setEndGameModal] = useState(true);

  // assists with resetting random key generation to re-render for response fly animation if multiple wrong questions asked in a row
  // set secret character at beginning of game - useEffect is similar to ngOnInit
  useEffect(() => {
    setSecretPerson(() => gameService.randomGameCharacter());    
  }, [])

  function onCardClick(name) {
    setPersonClicked(name)
    let secretName = secretPerson.name;
    let didChooseSecretPerson = name === secretName;
    console.log(setPersonClicked);
    console.log(secretName);
    console.log(didChooseSecretPerson);

    // IF Guess
    setGameOutcome("wrong")

    // if guess and wrong make another wrong mark and Funky fail response animation - GUESS SUCCESS BOOLEAN
    setGameOutcome("lose");

    // if guess and right mark card giant check and 
    setGameOutcome("win");
  }


function testBtn() {
  console.log('%cCurrent State', `color: goldenrod; background: #3d09bf; font-size:1.2rem; font-family: Helvetica; 
                                  font-weight: bolder; border: 2px solid #1cce69; border-radius: 5px; padding:0.5rem;
                                  margin: 1rem; width: 40rem`);
    console.log('Secret Person: ', secretPerson);
    console.log('ActiveMarker: ', activeMarker);
    console.log('PrimaryQuestion: ', primaryQuestion);
    console.log('SecondaryQuestions: ', secondaryQuestions);
    console.log('Guesses: ', guesses);
    console.log('GuessTrigger: ', guessTrigger);
    console.log('PersonClicked: ', personClicked );
}

function dismissToggle() {
  setActiveMarker(() => "dismiss");    
}

function guessToggle() {
  setActiveMarker(() => "guess");   
}

function updateQuestions($event) {
  setGuessTrigger(false)
  let primaryQuestion = $event.target.value
  setPrimaryQuestion(() => primaryQuestion)

  let secondaryQuestions = questions.filter((obj) => obj.primaryValue === primaryQuestion)[0].secondaryOptions
  secondaryQuestions.unshift("Pick One...")

  // console.log(secondaryQuestions);
  // console.log(secondaryQuestionsWithDefault);
  setSecondaryQuestions(() => secondaryQuestions)
  // console.log(secondaryQuestions);
  // secondOptionsDisplay = secondaryQuestions.map((el) => <option key={el} value={el}>{el}</option>)

}

function submitQuestion($event) {
  setGuessTrigger(true)
  let secondQuestionValue = $event.target.value
  let guess = secondQuestionValue;
  if (guess !== "Pick One...") {
    // console.log(primaryQuestion);
    // console.log(secretPerson);
    let secretAttribute = secretPerson[primaryQuestion]
    // console.log(secretAttribute);
    let isGuessCorrect = secretAttribute === guess;
    // console.log(isGuessCorrect);
  
  
    if (isGuessCorrect) {
      setHelperResponse('Yes! The person has this trait!')
      // console.log(helperResponse.length);
      setGuesses((guesses) => {
        let newGuessArray = guesses.map(item=> {
          return [item[0], false]
         });
  
  
        newGuessArray[currentGuess][0] = 1;
        newGuessArray[currentGuess][1] = true;
        // console.log(newGuessArray);
  
        return newGuessArray
      });
  
    }
    if (!isGuessCorrect) {
      // console.log(guess);
      // console.log(storedIncorrectResponseQuestion);
      setHelperResponse('No! The person does NOT have this trait...')
      // storedIncorrectResponseQuestion = guess;
      // console.log(helperResponse.length);
      setGuesses((guesses) => {
        let newGuessArray = guesses.map(item=> {
          return [item[0], false]
         });
  
  
        newGuessArray[currentGuess][0] = 2;
        newGuessArray[currentGuess][1] = true;
        // console.log(newGuessArray);
  
        return newGuessArray
      });
    }
    setCurrentGuess((currentGuess) => currentGuess + 1)
    // console.log(currentGuess);
    // console.log(guesses);
  
    // IF currentGuess = 5 - all attemps spent - IF NO WIN on try 5, OTHERWISE TRIGGER GAME OVER




  }


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

        // I need the last to NOT reanimate if !guessTrigger
        // console.log(guess);
          if (guess[0] === 0 ) {
            return (
              <div key={Math.random()} className='guess-box'></div>
            )
          }

          // Animate Only if this is the newest response BUT NOT A RE-RENDER
          if (guess[0] === 1 && guess[1] === true && guessTrigger) {
            return (
              <div key={Math.random()} className='guess-box response-yes'><div className='response-mark-delay'>&#10004;</div></div>
            )
          }
          if (guess[0] === 2 && guess[1] === true && guessTrigger) {
            return (
              <div key={Math.random()} className='guess-box response-no'><div className='response-mark-delay'>X</div></div>
            )
          }

        // No animation if newest response, but only switching questions - Activated for re-render, with no response = no need for animation
        if (guess[0] === 1 && guess[1] === true && !guessTrigger) {
          return (
            <div key={Math.random()} className='guess-box response-yes'><div>&#10004;</div></div>
          )
        }
        if (guess[0] === 2 && guess[1] === true && !guessTrigger) {
          return (
            <div key={Math.random()} className='guess-box response-no'><div>X</div></div>
          )
        }

          // Re-renders without animation if previous response
          if (guess[0] === 1 && guess[1] === false) {
            return (
              <div key={Math.random()} className='guess-box response-yes'><div className=''>&#10004;</div></div>
            )
          }
          if (guess[0] === 2 && guess[1] === false) {
            return (
              <div key={Math.random()} className='guess-box response-no'><div className=''>X</div></div>
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
          
        {secondaryQuestions.length > 0 && 
        <div>
          <select className="custom-select-2nd" name="questions" id="secondaryQuestions" onChange={event => submitQuestion(event)}>
              {secondaryQuestions.map(question => {

                if (question === "Pick One...") {
                  return <option key={Math.random()} disabled selected hidden>Pick One...</option> 
                }
                else {
                  return (
                    <option key={Math.random()} value={question}>{question}</option>
                  )     
                }
              }
         )}

          </select>
        </div>
        
        }



        <button onClick={dismissToggle}>Dismiss</button>
          <button onClick={guessToggle}>Guess</button>
      </div>
      <div>
        {helperResponse && helperResponse.length < 32 &&  guessTrigger &&
          <div key={Math.random()} className='response response-yes response-fly-animation'>
          {helperResponse}
          </div>
        }
        {helperResponse && helperResponse.length < 32 &&  !guessTrigger &&
          <div key={Math.random()} className='response response-yes'>
          {helperResponse}
          </div>
        }
        {helperResponse && helperResponse.length > 32  && guessTrigger &&
          <div key={Math.random()} className='response response-no response-fly-animation'>
          {helperResponse}
          </div>
        }
        {helperResponse && helperResponse.length > 32  && !guessTrigger &&
          <div key={Math.random()} className='response response-no'>
          {helperResponse}
          </div>
        }
      </div>
      <CardList characters={characters} activeMarker={activeMarker} onCardClick={onCardClick} /> 

      {/* END GAME MODAL */}
      {endGameModal && gameOutcome === "win" &&
        <div className='end-game-modal'>
          <div className='close-button'>X</div>
            <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>🎉</div>YOU WIN!!!<div className='modal-icon-animation'>🎉</div></div>
            <div className='endgame-detail-text'>_______ WAS INDEED THE SECRET PERSON</div>
            <div className='play-again'>Play Again?</div>
      </div>
      }

      {endGameModal && gameOutcome === "lose" &&
        <div className='end-game-modal'>
          <div className='close-button'>X</div>
            <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>😖</div>YOU LOSE!!!<div className='modal-icon-animation'>😭</div></div>
            <div className='endgame-detail-text'>You guessed wrong, it was not ________...and have already used your 5 questions/guesses!</div>
            <div className='play-again'>Play Again?</div>
      </div>
      }

      {endGameModal && gameOutcome === "wrong" &&
        <div className='end-game-modal'>
          <div className='close-button'>X</div>
            <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>🤨</div>WRONG PERSON!!!<div className='modal-icon-animation'>😝</div></div>
            <div className='endgame-detail-text'>It is not _____ ...but you still have remaining questions/guesses!</div>
            <div className='play-again'>Continue Game</div>

      </div>
      }


    </div>
  );
}

export default App;
