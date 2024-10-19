import React from 'react'
import InputKeyboard from './InputKeyboard'
import InputChoices from './InputChoices'

const Input = ({ input, keyboardMode }) =>
  <div className="answers">
    { keyboardMode && input !== 'choices' ?
      <InputKeyboard />
    :
      <InputChoices />
    }
  </div>

export default Input