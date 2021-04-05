import React from 'react'
import { Consumer } from './context';

const InputKeyboard = () => {

  const answer = React.createRef();

  return (
    <Consumer>
      { ({ actions }) => {

        const handleSubmit = (e) => {
          e.preventDefault();
          const currentAnswer = answer.current.value;
          actions.checkAnswer(currentAnswer);
          answer.current.focus();
          e.currentTarget.reset();
        }

        return (
          <form
          className="input"
          onSubmit={ handleSubmit }
          >
            <input
              id="answer-keyboard"
              name="answer"
              ref={answer}
              type="text"
              className="answer"
              placeholder="Enter answer..."
              autoFocus={true}
            />
            <input
              type="submit"
              value="Check"
              className="submit"
            />
          </form>
        )
      }}
    </Consumer>
  )
}

export default InputKeyboard