import React from 'react'

const InputToggle = ({actions}) =>
  <button className="input-control" onClick={ actions.toggleInput }>Toggle input</button>

export default InputToggle