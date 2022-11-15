
import './App.css';
import CardList from './components/card-list/card-list.component';
import { characters } from './assets/data/characters';
import { questions } from './assets/data/questions'



function App() {
  let selectedPrimaryQuestion;
  let selectedQuestionObject;

  let onSelectChange = (event) => {
    console.log(event.target.value);
    selectedPrimaryQuestion = event.target.value;
    for (const [key,value] of Object.entries(questions)) {
      // console.log({key}, {value});
      if (value.primaryValue === selectedPrimaryQuestion) {
        selectedQuestionObject = value;
        console.log(selectedQuestionObject);
      }
    }

    if (selectedQuestionObject.secondaryOptions) {
      console.log('HIT');
    }
  }




  return (
    <div className="App">
      <h1> 
        Guess Who
      </h1>
      {/* {console.log(questions)} */}
      <div className='select-flex'>
        <h2>Ask: Does the person...</h2>

        <select className="custom-select" name="questions" id="questions" onChange={onSelectChange}>
          <option disabled selected hidden>Question Topic...</option>
          {questions.map(question => (
                <option value={question.primaryValue}>{question.primaryQuestion}</option>
          ))}

        </select>

        <select className="custom-select" name="questions" id="questions">
          <option disabled selected hidden>Topic Options...</option>
          <option value="gender">Male</option>
          <option value="female">Female</option>
        </select>

      </div>
      {/* {console.log('app chars')}
      {console.log(characters)} */}
      <CardList characters={characters}/> 
    </div>
  );
}

export default App;
