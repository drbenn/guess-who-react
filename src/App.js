
import './App.css';
import CardList from './components/card-list/card-list.component';
import { characters } from './assets/data/characters';



function App() {
  return (
    <div className="App">
      <h1> 
        Guess Who
      </h1>
      <h2>Is Hair Brown</h2>
      {console.log('app chars')}
      {console.log(characters)}
      <CardList characters={characters}/> 
    </div>
  );
}

export default App;
