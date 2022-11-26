
import Card from '../card/card.component';
import './card-list.styles.css';


const CardList = props => {
    console.log(props);
    const characters = props.characters
    

    return (
        <div className='card-list'>

            {console.log('card-list')}
            {console.log(characters)}

            {characters.map((character) => {
                return <Card key={character.id} character={character}/>
            })}
        </div>
    )
}
export default CardList;