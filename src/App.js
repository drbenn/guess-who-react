import { useState, useEffect} from 'react';
import './App.css';
import Splash from './components/splash/splash.component';
import Title from './components/title/title.component';
import CardList from './components/card-list/card-list.component';
import { characters } from './assets/data/characters';
import { questions } from './assets/data/questions'
import * as gameService from './services/game.service'
import Scoreboard from './components/guess-scoreboard/guess-scoreboard.component';
import MarkerButtonGroup from './components/marker-button-group/marker-button-group.component';
import Modals from './components/modals/modals.component';




function App() {

  // STATE
  const [secretPerson, setSecretPerson] = useState("");
  const [personClicked, setPersonClicked] = useState("");
  const [activeMarker, setActiveMarker] = useState("");
  const [activeMarkerClass, setActiveMarkerClass] = useState(["dismiss-button","guess-button"]);
  const [guesses, setGuesses] = useState([[0, false],[0, false],[0, false],[0, false],[0, false]]);
  const [currentGuess, setCurrentGuess] = useState(0);
  // Animation re-render trigger 
  const [guessTrigger, setGuessTrigger] = useState(true);
  const [primaryQuestion, setPrimaryQuestion] = useState("");
  const [secondaryQuestions, setSecondaryQuestions] = useState([]);
  const [helperResponse, setHelperResponse] = useState("");
  const [gameOutcome, setGameOutcome] = useState("");
  const [gameModal, setGameModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [resetAllCards, setResetAllCards] = useState(false);
  

  // assists with resetting random key generation to re-render for response fly animation if multiple wrong questions asked in a row
  // set secret character at beginning of game - useEffect is similar to ngOnInit
  useEffect(() => {
    setSecretPerson(() => gameService.randomGameCharacter());   
  }, [])


  function startNewGame() {
    setResetAllCards(true);
    setSecretPerson("");
    setPersonClicked("");
    setActiveMarker("");
    setActiveMarkerClass(["dismiss-button","guess-button"]);
    setGuesses([[0, false],[0, false],[0, false],[0, false],[0, false]]);
    setCurrentGuess(0);
    // Animation re-render trigger 
    setGuessTrigger(true);
    setPrimaryQuestion("");
    setSecondaryQuestions([]);
    setHelperResponse("");
    setGameOutcome("");
    setGameModal(false);
    setSecretPerson(() => gameService.randomGameCharacter()); 
  }

  // function resetAllCards() {
  //   console.log('resetcards');
  // }

  function toggleHelpModal() {
    setHelpModal(!helpModal);
    console.log(`The secret person is most definitely NOT ${secretPerson.name} - 😅`); 
  }

  function onCardClick(name) {
    setPersonClicked(name)
    let secretName = secretPerson.name;
    let didChooseSecretPerson = name === secretName;
    // console.log(setPersonClicked);
    // console.log(secretName);
    // console.log(didChooseSecretPerson);

    // opens win modal, no more guessing
    if (didChooseSecretPerson && activeMarker === "guess") {
      setCurrentGuess((currentGuess) => currentGuess + 1)
      guesses[currentGuess][0] = 1;
      setGameOutcome("win");
      setGameModal(true);
    }

    // opens wrong modal, allows to continue guessing
    if (!didChooseSecretPerson  && guesses[4][0] === 0 && activeMarker === "guess") {
      setCurrentGuess((currentGuess) => currentGuess + 1)
      guesses[currentGuess][0] = 2;
      setGameOutcome("wrong")
      setGameModal(true);
    }

    // opens lose modal, no more guessing
    if (!didChooseSecretPerson  && guesses[4][0] !== 0) {
      setCurrentGuess((currentGuess) => currentGuess + 1)
      guesses[currentGuess][0] = 2;
      setGameOutcome("lose")
      setGameModal(true);
    }
  }

  function closeModal() {
    setGameModal(false);
    setHelpModal(false);
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
  setResetAllCards(false);  // to allow markings in new game
  setActiveMarkerClass(["dismiss-button-active","guess-button"]);
}

function guessToggle() {
  setActiveMarker(() => "guess");   
  setResetAllCards(false); // to allow markings in new game
  setActiveMarkerClass(["dismiss-button","guess-button-active"]);
}

function updateQuestions($event) {
  setGuessTrigger(false)
  let primaryQuestion = $event.target.value
  setPrimaryQuestion(() => primaryQuestion)

  let secondaryQuestions = questions.filter((obj) => obj.primaryValue === primaryQuestion)[0].secondaryOptions
  secondaryQuestions.unshift("Pick One...")

  setSecondaryQuestions(() => secondaryQuestions)

}

function submitQuestion($event) {
  setGuessTrigger(true)
  let secondQuestionValue = $event.target.value
  let guess = secondQuestionValue;
  if (guess !== "Pick One..." &&  gameOutcome !== "win" && gameOutcome !== "lose") {
    let secretAttribute = secretPerson[primaryQuestion]
    let isGuessCorrect = secretAttribute === guess;
 
  
    if (isGuessCorrect) {
      setHelperResponse('Yes! The person has this trait!')
      setGuesses((guesses) => {
        let newGuessArray = guesses.map(item=> {
          return [item[0], false]
         });
        newGuessArray[currentGuess][0] = 1;
        newGuessArray[currentGuess][1] = true;
        
        return newGuessArray
      });
  
    }
    if (!isGuessCorrect) {
      setHelperResponse('No! The person does NOT have this trait...')
      setGuesses((guesses) => {
        let newGuessArray = guesses.map(item=> {
          return [item[0], false]
         });
  
  
        newGuessArray[currentGuess][0] = 2;
        newGuessArray[currentGuess][1] = true;

        return newGuessArray
      });


    }
    setCurrentGuess((currentGuess) => currentGuess + 1)

    // GAME OVER - TOO MANY GUESSES AND RAN OUT OF ATTEMPTS
    console.log(currentGuess);
    if (currentGuess === 4) {
      setGameOutcome("guessed-out")
      setGameModal(true);
    }
  }


}


  return (
    <div className="App">
      <Splash />
      <Title />
      <Scoreboard guesses={guesses} guessTrigger={guessTrigger} />

      {/* AskOptions Refactor incomplete */}
      {/* <AskOptions  questions={questions} secondaryQuestions={secondaryQuestions} updateQuestions={updateQuestions} submitQuestions={submitQuestion} activeMarkerClass={activeMarkerClass} dismissToggle={dismissToggle} guessToggle={guessToggle}/> */}


    {/* REFACTOR BEGIN SECTION */}
      <div className='wrap-flex'>
       <div className='select-flex'>
          {/* <div className='ask-text'>
            Ask:
          </div> */}

          <div>
            {/* <select className="custom-select" name="questions" id="questions" onChange={onSelectChange}> */}
            <select className="custom-select" name="questions" id="questions" onChange={event => updateQuestions(event)}>
              <option key={Math.random()} disabled value={"Ask Topic..."} hidden  >Ask Topic...</option>
              {questions.map(question => (
                    <option key={Math.random()} value={question.primaryValue}>{question.primaryQuestion}</option>
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


          <MarkerButtonGroup activeMarkerClass={activeMarkerClass} dismissToggle={dismissToggle} guessToggle={guessToggle} />
          </div>


      </div>

      {/* REFACTOR END SECTION */}
      <div>
        {helperResponse && helperResponse.length < 32 &&  guessTrigger &&
          <div key={Math.random()} className='response response-yes response-fly-animation'>
          {helperResponse}
          </div>
        }
        {helperResponse && helperResponse.length < 32 &&  !guessTrigger &&
        helpModal && !helpModal &&
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




      {/* <button onClick={testBtn}>TEST</button> */}







      <CardList characters={characters} activeMarker={activeMarker} onCardClick={onCardClick} gameOutcome={gameOutcome} resetAllCards={resetAllCards} /> 

        <Modals gameModal={gameModal} gameOutcome={gameOutcome} secretPerson={secretPerson} startNewGame={startNewGame} personClicked={personClicked} closeModal={closeModal} helpModal={helpModal} toggleHelpModal={toggleHelpModal}/>
    </div>
  );
}

export default App;
