import './modals.styles.css';

const Modals = ({gameModal, gameOutcome, secretPerson,startNewGame,personClicked, closeModal, helpModal, toggleHelpModal}) => {
  return (
    <div>
          {/* END GAME MODAL */}
      {/* Winning Guess, GAME OVER */}
      {gameModal && gameOutcome === "win" && secretPerson &&
        <div className='end-game-modal'>
          {/* <div className='close-button' onClick={closeModal}>X</div> */}
            <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>🎉</div>YOU WIN!!!<div className='modal-icon-animation'>🎉</div></div>
            <div className='endgame-detail-text'><span style={{ fontWeight: '800'}}>{secretPerson.name.toUpperCase()}</span> WAS INDEED THE SECRET PERSON</div>
            <div className='play-again' onClick={startNewGame} >Play Again?</div>
            <div className='char-pic'>        
              <img alt={`Char ${secretPerson.name}`} src={require(`../../assets/character-img/${secretPerson.img}`)}
              />
            </div>
      </div>
      }
      {/* Wrong guess, GAME OVER */}
      {gameModal && gameOutcome === "lose" && secretPerson &&
        <div className='end-game-modal'>
          {/* <div className='close-button' onClick={closeModal}>X</div> */}
            <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>😖</div>YOU LOSE!!!<div className='modal-icon-animation'>😭</div></div>
            <div className='endgame-detail-text'>You guessed wrong, it was not <span style={{ fontWeight: '800'}}>{personClicked.toUpperCase()}</span>...and have already used your 5 questions/guesses!</div>
            <div className='play-again' onClick={startNewGame} >Play Again?</div>
            <div className='char-pic'>        
              <img alt={`Char ${personClicked}`} src={require(`../../assets/character-img/${personClicked}.png`)}
              />
            </div>
      </div>
      }
      {/* Out of turns, GAME OVER */}
      {gameModal && gameOutcome === "guessed-out" && secretPerson &&
        <div className='end-game-modal'>
          {/* <div className='close-button' onClick={closeModal}>X</div> */}
            <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>😖</div>YOU LOSE!!!<div className='modal-icon-animation'>😭</div></div>
            <div className='endgame-detail-text'>You only have 5 attempts to guess or ask questions!
            <br></br>
            <br></br>
            Hint: Ask questions for your first 4 attempts, select the dismiss button and click characters as you go to rule them out, on your 5th attempt, click the guess button and then click the card with your most excellent and educated guess!!
            </div>
            <div className='play-again' onClick={startNewGame} >Play Again?</div>
        </div>
      }
      {/* Wrong guess, but can keep playing */}
      {gameModal && gameOutcome === "wrong" && secretPerson &&
        <div className='end-game-modal'>
          {/* <div className='close-button' onClick={closeModal}>X</div> */}
            <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>🤨</div>WRONG PERSON!!!<div className='modal-icon-animation'>😝</div></div>
            <div className='endgame-detail-text'>It is not <span style={{ fontWeight: '800'}}>{personClicked.toUpperCase()}</span> ...but you still have remaining questions/guesses!</div>
            <div className='play-again' onClick={closeModal}>Continue Game</div>
            <div className='char-pic'>        
              <img alt={`Char ${personClicked}`} src={require(`../../assets/character-img/${personClicked}.png`)}
              />
            </div>

      </div>
      }

      {/* HELP MODAL */}
      {helpModal && 
        <div className='end-game-modal'>
          {/* <div className='close-button' onClick={closeModal}>X</div> */}
          <div className='endgame-modal-splash-text'><div className='modal-icon-animation'>🤷‍♂️</div>Help<div className='modal-icon-animation'>🤷‍♀️</div></div>
          <div className='help-detail-text'>
            <p>The goal is to use hints and then guess the secret person</p>
            <p>You have 5 attempts, click the drop-down to ask a question and get a hint, this will use 1 attempt. Use the hint and click the dismiss button, then click on cards that you can eliminate from the choices.</p>
            <p>Clicking on the guess button and selecting a card will also use a guess. You do not need to wait until the final attempt to guess, if you guess and still have attempts you can continue playing until you run out of attempts.</p>                 
          </div>
          <div className='play-again' onClick={closeModal}>Continue Game</div>
          <p><a href="https://www.danbennett.dev" target="_blank" rel="noreferrer">danbennett.dev</a></p>
        </div>
      }

      <div className='help-button' onClick={toggleHelpModal}>Help</div>
      </div>
  )
}

export default Modals;