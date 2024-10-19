import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Audio = ({ sound, actions }) =>
  <button
    className="input-control icon sound"
    onClick={ actions.toggleSound }
    type="button"
  >
    <FontAwesomeIcon icon={ sound ? 'volume-up' : 'volume-mute' } />
  </button>

export default Audio