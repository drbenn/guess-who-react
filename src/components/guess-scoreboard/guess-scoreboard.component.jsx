import './guess-scoreboard.styles.css';

const Scoreboard = ({guesses, guessTrigger }) => {
  return (
    <div className='guesses-container'>
    {guesses.map((guess) => {

      // I need the last to NOT reanimate if !guessTrigger
      // console.log(guess);
        if (guess[0] === 0 ) {
          return (
            <div key={Math.random()} className='guess-box'></div>
          )
        }

        // Animate Only if this is the newest response BUT NOT A RE-RENDER
        if (guess[0] === 1 && guess[1] === true && guessTrigger) {
          return (
            <div key={Math.random()} className='guess-box response-yes'><div className='response-mark-delay'>&#10004;</div></div>
          )
        }
        if (guess[0] === 2 && guess[1] === true && guessTrigger) {
          return (
            <div key={Math.random()} className='guess-box response-no'><div className='response-mark-delay'>X</div></div>
          )
        }

      // No animation if newest response, but only switching questions - Activated for re-render, with no response = no need for animation
      if (guess[0] === 1 && guess[1] === true && !guessTrigger) {
        return (
          <div key={Math.random()} className='guess-box response-yes'><div>&#10004;</div></div>
        )
      }
      if (guess[0] === 2 && guess[1] === true && !guessTrigger) {
        return (
          <div key={Math.random()} className='guess-box response-no'><div>X</div></div>
        )
      }

        // Re-renders without animation if previous response
        if (guess[0] === 1 && guess[1] === false) {
          return (
            <div key={Math.random()} className='guess-box response-yes'><div className=''>&#10004;</div></div>
          )
        }
        if (guess[0] === 2 && guess[1] === false) {
          return (
            <div key={Math.random()} className='guess-box response-no'><div className=''>X</div></div>
          )
        }
          return null
        })}
    </div>

  )


}

export default Scoreboard;