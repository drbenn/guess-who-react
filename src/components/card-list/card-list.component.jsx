
import Card from '../card/card.component';
import './card-list.styles.css';


const CardList = props => {
    // console.log(props);
    const characters = props.characters;
    let activeMarker = props.activeMarker;

    function classUpdate() {
        console.log('something');
    }
    

    return (
        <div className='card-list'>

            {/* {console.log('card-list')}
            {console.log(characters)} */}

            {characters.map((character) => {
                return <Card key={character.id} character={character} activeMarker={activeMarker} classUpdate={classUpdate} />
            })}
        </div>
    )
}
export default CardList;