// import './card.styles.scss';



const Card = props => {
        // console.log(props);
        const character = props.character;

        const {id,name,img} = character
        let cardClick = () => {
            console.log(name);
         }

        // function cardClicked() {
        // console.log(`card Clicked ${character}`);
        // }
    
        
        return (
        <div className="card-container"  key={id} onClick={cardClick}>
        {/* {console.log('card')}
        {console.log(character)}
        {console.log(character.img)} */}
        <img 
        alt={`Char ${name}`} 

        src={require(`../../assets/character-img/${img}`)}
        />
        {/* <div className='image-overlay'>X</div> */}
        <div className='image-overlay'>&#10004;</div>


    </div>
        )
    }


export default Card;