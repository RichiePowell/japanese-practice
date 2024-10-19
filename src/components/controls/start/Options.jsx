import React from 'react'
import ChangeAnswerTimer from './ChangeAnswerTimer'
import ChangeGameTimer from './ChangeGameTimer'
import ToggleShowCorrectAnswer from './ToggleShowCorrectAnswer'

const Options = ({ answerTimer, gameTimer, showWrongAnswerDialog, actions }) =>
  <div className="options options--highlight">
    <ChangeAnswerTimer
      answerTimer={answerTimer}
      actions={actions} />
    <ChangeGameTimer
      gameTimer={gameTimer}
      actions={actions} />
    <ToggleShowCorrectAnswer
      showWrongAnswerDialog={showWrongAnswerDialog}
      actions={actions}  />
  </div>

export default Options