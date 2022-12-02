import './marker-button-group.styles.css';

const MarkerButtonGroup = ({activeMarkerClass, dismissToggle, guessToggle }) => {

  console.log(activeMarkerClass);
  console.log(dismissToggle);
  console.log(guessToggle);
  return (

  <div className='active-marker-container'>
    <div className={activeMarkerClass[0]} onClick={dismissToggle}>Dismiss</div>
    <div className={activeMarkerClass[1]} onClick={guessToggle}>Guess</div>
  </div>

  )
}

export default MarkerButtonGroup;