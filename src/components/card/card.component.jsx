import { useState } from 'react';

const Card = ({character, newMarker, gameOutcome, resetAllCards}) => {
    const [cardSymbol, setCardSymbol] = useState("");
    const [cardClass, setCardClass] = useState("");
    // const character = props.character;
    // const newMarker = props.activeMarker;
    // const gameOutcome = props.gameOutcome;
    // const resetAllCards = props.resetAllCards;
    const {id,name,img} = character

    // Clears card marks on gamereset
    if (resetAllCards && cardClass !== "") {
        setCardSymbol("");
        setCardClass("");
    }


    let cardClick = () => {
        console.log(newMarker, gameOutcome);

        if (newMarker === 'guess' && gameOutcome === 'win') {
            setCardClass("correct-overlay"); 
            setCardSymbol("\u2714"); 
        }
        else if (gameOutcome === "" | gameOutcome === 'wrong') {

            if (newMarker === 'dismiss'  && cardClass !== 'dismiss-overlay') {setCardClass("dismiss-overlay"); setCardSymbol("X")};
            if (newMarker === 'dismiss' && cardClass === 'dismiss-overlay') {setCardClass(""); setCardSymbol("")};
            if (newMarker === 'guess'  && cardClass !== 'dismiss-overlay') {setCardClass("dismiss-overlay"); setCardSymbol("X")};
        }
    }

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