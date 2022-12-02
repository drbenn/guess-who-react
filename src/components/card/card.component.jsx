import { useState } from 'react';

const Card = ({character, activeMarker, onCardClick, gameOutcome, resetAllCards}) => {
    const [cardSymbol, setCardSymbol] = useState("");
    const [cardClass, setCardClass] = useState("");
    const {id,name,img} = character


    // Clears card marks on gamereset
    if (resetAllCards && cardClass !== "") {
        setCardSymbol("");
        setCardClass("");
    }


    let cardClick = () => {
        onCardClick(name);
        console.log(activeMarker, gameOutcome);

        if (activeMarker === 'guess' && gameOutcome === 'win') {
            setCardClass("correct-overlay"); 
            setCardSymbol("\u2714"); 
        }
        else if (gameOutcome === "" | gameOutcome === 'wrong') {

            if (activeMarker === 'dismiss'  && cardClass !== 'dismiss-overlay') {setCardClass("dismiss-overlay"); setCardSymbol("X")};
            if (activeMarker === 'dismiss' && cardClass === 'dismiss-overlay') {setCardClass(""); setCardSymbol("")};
            if (activeMarker === 'guess'  && cardClass !== 'dismiss-overlay') {setCardClass("dismiss-overlay"); setCardSymbol("X")};
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