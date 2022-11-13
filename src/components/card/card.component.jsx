// import './card.styles.scss';


const Card = ({character}) => {

        const {id,name,img} = character
        return (
        <div className="card-container"  key={id}>
        {console.log('card')}
        {console.log(character)}
        {console.log(character.img)}
        <img 
        alt={`Char ${name}`} 

        src={require(`../../assets/character-img/${img}`)}
        />
        <div className='card-cover'></div>

    </div>
        )
    }


export default Card;