import React from 'react';
import { Consumer } from './context';

const setContainsWord = (set) => {
  return set.some( (answers) => {
    return answers[0].length > 3;
  });
}

const InputChoices = () =>
  <Consumer>
    { ({ answerOptions, actions }) => (
      <div className={ `answer-options${ setContainsWord(answerOptions) ? ' answer-options--contains-word' : '' }` }>
        {answerOptions && answerOptions.map( (answers, index) => {
          let answer = answers[0];
          return (
          <button
            key={ answer + index }
            type="button"
            className={ "answer-options__option" }
            name="answer"
            value={ answer }
            onClick={ () => actions.checkAnswer(answer) }
          >{ answer }</button>
        )})}
      </div>
    )}
  </Consumer>

export default InputChoices;