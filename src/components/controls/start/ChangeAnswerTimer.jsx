import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChangeAnswerTimer = ({ answerTimer, actions }) => {

  let items = []
  for(let i = 1; i <= 10; i++)
    items.push(<option value={i} key={i}>{i} second{ i > 1 ? 's' : '' }</option>)

  return (
    <div className="float-right">
      <div className="input-label">Time to answer</div>
      <FontAwesomeIcon icon="stopwatch" className="fa-fw answer-time-icon" />
      <select
        className="input-control"
        onChange={ (e) => {
          actions.changeAnswerTimer(e.target.value);
          if(e.target.value !== "0") {
            document.querySelector('.answer-time-icon').classList.add('active');
          } else {
            document.querySelector('.answer-time-icon').classList.remove('active');
          }
        }}
        value={ answerTimer }
      >
        <option value="0">No limit</option>
        { items }
      </select>
    </div>
  )
}

export default ChangeAnswerTimer