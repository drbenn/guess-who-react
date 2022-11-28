import { useState } from 'react';

const Card = props => {
    const [cardSymbol, setCardSymbol] = useState("");
    const [cardClass, setCardClass] = useState("");
    const character = props.character;
    const newMarker = props.activeMarker;
    const onCardClick = props.onCardClick;
    const gameOutcome = props.gameOutcome;
    const {id,name,img} = character

    let cardClick = () => {
        onCardClick(name);
        if (gameOutcome === "" | gameOutcome === 'wrong') {

            if (newMarker === 'dismiss'  && cardClass !== 'dismiss-overlay') {setCardClass("dismiss-overlay"); setCardSymbol("X")};
            if (newMarker === 'dismiss' && cardClass === 'dismiss-overlay') {setCardClass(""); setCardSymbol("")};
            if (newMarker === 'guess') {
                setCardClass("correct-overlay"); 
                setCardSymbol("\u2714"); 
            };
        }}

    return (
    <div className="card-container"  key={id} onClick={cardClick}>
        <img 
            alt={`Char ${name}`} 
            src={require(`../../assets/character-img/${img}`)}
        />
        <div className={cardClass}>{cardSymbol}</div>
    </div>
    )
}

export default Card;