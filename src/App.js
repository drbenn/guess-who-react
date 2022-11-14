
import './App.css';
import CardList from './components/card-list/card-list.component';
import { characters } from './assets/data/characters';



function App() {
  return (
    <div className="App">
      <h1> 
        Guess Who
      </h1>
      <div className='select-flex'>
        <h2>Ask: Does the person...</h2>
        <select className="custom-select" name="questions" id="questions">
          <option disabled selected hidden>Question Topic...</option>
          <option value="gender">Gender</option>
        </select>
        <select className="custom-select" name="questions" id="questions">
          <option disabled selected hidden>Topic Options...</option>
          <option value="gender">Male</option>
          <option value="female">Female</option>
        </select>

      </div>
      {console.log('app chars')}
      {console.log(characters)}
      <CardList characters={characters}/> 
    </div>
  );
}

export default App;
