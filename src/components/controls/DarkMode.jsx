import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DarkMode = ({ actions }) =>
  <button
    className="input-control icon dark-mode"
    onClick={ () => actions.toggleDarkMode() }
  >
    <FontAwesomeIcon icon="adjust" />
  </button>

export default DarkMode