import React from 'react'

const Character = ({ currentCharacter }) =>
  <div className={ 'character' +
    (currentCharacter.length === 2 ? ' character--smaller' :
    currentCharacter.length > 2 ? ' character--word' : '') }
  >
    { currentCharacter }
  </div>

export default Character