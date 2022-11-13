
import './App.css';
import CardList from './components/card-list/card-list.component';




function App() {
  const characters = [
    {
      id:1,
      name:'alex',
      img:'alex.png'
    },
    {
      id:2,
      name:'alfred',
      img:'alfred.png'
    },
    {
      id:3,
      name:'anita',
      img:'anita.png'
    },
    {
      id:4,
      name:'anne',
      img:'anne.png'
    },
    {
      id:5,
      name:'bernard',
      img:'bernard.png'
    },
    {
      id:6,
      name:'bill',
      img:'bill.png'
    },
    {
      id:7,
      name:'claire',
      img:'claire.png'
    },
    {
      id:8,
      name:'charles',
      img:'charles.png'
    },
    {
      id:9,
      name:'david',
      img:'david.png'
    },
    {
      id:10,
      name:'eric',
      img:'eric.png'
    },
    {
      id:11,
      name:'frans',
      img:'frans.png'
    },
    {
      id:12,
      name:'george',
      img:'george.png'
    },
    {
      id:13,
      name:'herman',
      img:'herman.png'
    },
    {
      id:14,
      name:'joe',
      img:'joe.png'
    },
    {
      id:15,
      name:'maria',
      img:'maria.png'
    },
    {
      id:16,
      name:'max',
      img:'max.png'
    },
    {
      id:17,
      name:'paul',
      img:'paul.png'
    },
    {
      id:18,
      name:'peter',
      img:'peter.png'
    },
    {
      id:19,
      name:'philip',
      img:'philip.png'
    },
    {
      id:20,
      name:'richard',
      img:'richard.png'
    },
    {
      id:21,
      name:'robert',
      img:'robert.png'
    },
    {
      id:22,
      name:'sam',
      img:'sam.png'
    },
    {
      id:23,
      name:'susan',
      img:'susan.png'
    },
    {
      id:24,
      name:'tom',
      img:'tom.png'
    },
  
  ]
  return (
    <div className="App">
      <h1> 
        Guess Who
      </h1>
      {console.log('app chars')}
      {console.log(characters)}
      <CardList characters={characters}/> 
    </div>
  );
}

export default App;
