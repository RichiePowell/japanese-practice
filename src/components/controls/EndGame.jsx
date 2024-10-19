import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EndGame = () =>
  <Link
    className="input-control icon end"
    to="/"
    type="button"
  >
    <FontAwesomeIcon icon="times" />
  </Link>

export default EndGame