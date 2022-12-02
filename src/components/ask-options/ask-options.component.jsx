import MarkerButtonGroup from '../marker-button-group/marker-button-group.component'
import './ask-options.styles.css'


const AskOptions = ({ questions, secondaryQuestions, updateQuestions, submitQuestion, activeMarkerClass, dismissToggle, guessToggle }) => {

  return (
    <div className='wrap-flex'>
    <div className='select-flex'>
       <div>
         <select className="custom-select" name="questions" id="questions" onChange={event => updateQuestions(event)}>
           <option key={Math.random()} disabled selected hidden  >Ask Topic...</option>
           {questions.map(question => (
                 <option key={Math.random()} value={question.primaryValue}>{question.primaryQuestion}</option>
           ))}

         </select>

       </div>
         
       {secondaryQuestions.length > 0 && 
       <div>
         <select className="custom-select-2nd" name="questions" id="secondaryQuestions" onChange={event => submitQuestion(event)}>
             {secondaryQuestions.map(question => {

               if (question === "Pick One...") {
                 return <option key={Math.random()} disabled selected hidden>Pick One...</option> 
               }
               else {
                 return (
                   <option key={Math.random()} value={question}>{question}</option>
                 )     
               }
             })}
         </select>
       </div>
       }

       <MarkerButtonGroup 
         activeMarkerClass={activeMarkerClass} dismissToggle={dismissToggle} 
         guessToggle={guessToggle} 
       />
       
       </div>


   </div>
  )
}

export default AskOptions;