// import './card.styles.scss';
import { useState } from 'react';


const Card = props => {
            // const [activeMarker, setActiveMarker] = useState("");
        // const [testValue, setTestValue] = useState("Blank");
        // const [activeMarker, setActiveMarker] = useState("")
        const [cardSymbol, setCardSymbol] = useState("");
        const [cardClass, setCardClass] = useState("");
        // console.log(props);
        const character = props.character;
        let newMarker = props.activeMarker;
        const onCardClick = props.onCardClick;
        // let classUpdate = props.classUpdate;

        // let cardStatus = 'image-overlay'
        // let cardSymbol = '';

        const {id,name,img} = character
        let cardClick = () => {
            // setTestValue('click')
            console.log(name);
            onCardClick(name);
            // console.log(activeMarker);
            if (newMarker === 'dismiss'  && cardClass !== 'dismiss-overlay') {setCardClass("dismiss-overlay"); setCardSymbol("X")};
            if (newMarker === 'dismiss' && cardClass === 'dismiss-overlay') {setCardClass(""); setCardSymbol("")};
            if (newMarker === 'guess') {setCardClass("correct-overlay"); setCardSymbol("\u2714")};
         }

        // function cardClicked() {
        // console.log(`card Clicked ${character}`);
        // }
    
        
        
        return (
        <div className="card-container"  key={id} onClick={cardClick}>
        {/* {console.log('card')}
        {console.log(character)}
        {console.log(character.img)} */}
        <img 
        alt={`Char ${name}`} 

        src={require(`../../assets/character-img/${img}`)}
        />
        <div className={cardClass}>{cardSymbol}</div>
    </div>
        )
    }


export default Card;