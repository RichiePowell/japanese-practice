import React from 'react'
import { Consumer } from './context'

const InputChoices = () =>
  <Consumer>
    { ({ answerOptions, actions }) => (
      <div className="answer-options">
        {answerOptions && answerOptions.map( (answers, index) => {
          let answer = answers[0];
          return (
          <button
            key={ answer + index }
            type="button"
            className={ "answer-options__option" + (answer.length > 2 ? ' answer-options__option--word' : '') }
            name="answer"
            value={ answer }
            onClick={ () => actions.checkAnswer(answer) }
          >{ answer }</button>
        )})}
      </div>
    )}
  </Consumer>

export default InputChoices;