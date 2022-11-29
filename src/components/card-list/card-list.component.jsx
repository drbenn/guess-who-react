
import Card from '../card/card.component';
import './card-list.styles.css';

const CardList = props => {
    const characters = props.characters;
    const activeMarker = props.activeMarker;
    const onCardClick = props.onCardClick;
    const gameOutcome = props.gameOutcome;
    const resetAllCards = props.resetAllCards;
    console.log(gameOutcome);
   
    return (
        <div className='card-list'>
            {characters.map((character) => {
                return (
                    <Card 
                    key={character.id} character={character} activeMarker={activeMarker} 
                    onCardClick={onCardClick} gameOutcome={gameOutcome} resetAllCards={resetAllCards}
                    />
                )
            })}
        </div>
    )
}

export default CardList;