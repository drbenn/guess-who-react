import { useState, useContext } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import { characters } from './assets/data/characters';
import { questions } from './assets/data/questions'
import * as gameService from './services/game.service'

// UserContext provides the value from the user.context provider where value={value}
// where the value is the current user as well as the setter setCurrentUser
import { GameContext } from './contexts/game.context'


function App() {
  gameService.randomGameCharacter();
  gameService.questionResponse('sex','m');
  let selectedPrimaryQuestion;
  let selectedQuestionObject;
  let secondOption;
  // const { currentGame } = useContext(GameContext);
  const statePrimaryQuestion = useContext(GameContext);

  const { setCurrentGame } = useContext(GameContext);

  let onSelectChange = (event) => {
    console.log(event.target.value);
    selectedPrimaryQuestion = event.target.value;

    setCurrentGame(selectedPrimaryQuestion)


    for (const [key,value] of Object.entries(questions)) {
      // console.log({key}, {value});
      if (value.primaryValue === selectedPrimaryQuestion) {
        selectedQuestionObject = value;
        console.log(selectedQuestionObject);

      }
    }

    // if (!selectedQuestionObject.secondaryOptions) {
    //   console.log('HIT');
    //   secondOption = '';
    // } else {
    //   secondOption = 
    // }
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
      {/* {console.log(questions)} */}
      <div className='select-flex'>
        <div className='ask-text'>
          Ask:
        </div>

        <div>
          <select className="custom-select" name="questions" id="questions" onChange={onSelectChange}>
            <option disabled selected hidden>Question Topic...</option>
            {questions.map(question => (
                  <option value={question.primaryValue}>{question.primaryQuestion}</option>
            ))}

          </select>
        </div>

        <div>
          <select className="custom-select" name="questions" id="questions">
            <option disabled selected hidden>Topic Options...</option>
            <option value="gender">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      {/* {console.log('app chars')}
      {console.log(characters)} */}
      <CardList characters={characters}/> 
    </div>
  );
}

export default App;
