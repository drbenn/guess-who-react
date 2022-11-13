
import Card from '../card/card.component';
import './card-list.styles.css';


const CardList = ({characters}) => (

        <div className='card-list'>
            {console.log('card-list')}
            {console.log(characters)}
            {characters.map((character) => {
                return <Card key={character.id} character={character}/>
            })}
        </div>
)


export default CardList;