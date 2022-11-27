
import Card from '../card/card.component';
import './card-list.styles.css';


const CardList = props => {
    // console.log(props);
    const characters = props.characters;
    const activeMarker = props.activeMarker;
    const onCardClick = props.onCardClick;

    function classUpdate() {
        console.log('something');
    }
    

    return (
        <div className='card-list'>

            {/* {console.log('card-list')}
            {console.log(characters)} */}

            {characters.map((character) => {
                return <Card key={character.id} character={character} activeMarker={activeMarker} classUpdate={classUpdate}  onCardClick={onCardClick} />
            })}
        </div>
    )
}
export default CardList;