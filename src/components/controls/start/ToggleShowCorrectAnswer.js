import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ToggleShowCorrectAnswer = ({ showWrongAnswerDialog, actions }) =>
  <>
    <input type="checkbox"
      className="checkbox__box__input"
      id="showCorrectAnswer"
      checked={ showWrongAnswerDialog }
      onChange={ (e) => { actions.toggleWrongAnswerDialog(e.target.checked) }} />
    <label
      className="checkbox input-label input-row"
      htmlFor="showCorrectAnswer"
    >
      <div className="checkbox__box">
        <FontAwesomeIcon
          icon="check"
          className="checkbox__box__check"
        />
      </div>
      Show correct answer after mistake
    </label>
  </>

export default ToggleShowCorrectAnswer