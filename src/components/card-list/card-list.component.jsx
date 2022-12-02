
import Card from '../card/card.component';
import './card-list.styles.css';

const CardList = ({characters, activeMarker, secretPerson, onCardClick, resetAllCards}) => {
   
    return (
        <div className='card-list'>
            {characters.map((character) => {
                return (
                    <Card 
                    key={character.id} character={character} activeMarker={activeMarker} 
                    onCardClick={onCardClick} secretPerson={secretPerson} resetAllCards={resetAllCards}
                    />
                )
            })}
        </div>
    )
}

export default CardList;