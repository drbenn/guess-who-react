import './helper-message.styles.css';

const HelperMessage = ({helperResponse, guessTrigger, helpModal}) => {
  return (
    <div>
    {helperResponse && helperResponse.length < 32 &&  guessTrigger &&
      <div key={Math.random()} className='response response-yes response-fly-animation'>
      {helperResponse}
      </div>
    }
    {helperResponse && helperResponse.length < 32 &&  !guessTrigger &&
    helpModal && !helpModal &&
      <div key={Math.random()} className='response response-yes'>
      {helperResponse}
      </div>
    }
    {helperResponse && helperResponse.length > 32  && !guessTrigger &&
      <div key={Math.random()} className='response response-no response-fly-animation'>
      {helperResponse}
      </div>
    }
    {helperResponse && helperResponse.length > 32  && guessTrigger &&
      <div key={Math.random()} className='response response-no'>
      {helperResponse}
      </div>
    }
  </div>

  )
}

export default HelperMessage;