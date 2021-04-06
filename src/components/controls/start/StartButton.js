import React from 'react'
import { Link } from 'react-router-dom'

const isReadyToStart = ( kanaSelected ) => {
  return kanaSelected.length === 0 ? false : true
}

const StartButton = ({ kanaSelected }) =>
  <Link
    className="button start"
    to={ isReadyToStart(kanaSelected) ? '/play' : '#' }
    onClick={ () => !isReadyToStart(kanaSelected) ? alert("Please select what you want to practice.") : '' }
  >
    Start Game
  </Link>

export default StartButton