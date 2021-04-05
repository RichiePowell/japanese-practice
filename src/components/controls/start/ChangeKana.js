import React from 'react'
import { Consumer } from './../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChangeKana = () =>
  <Consumer>
    { ({ kana, kanaSelected, actions }) => (
      <div className="options options--rows">
        { Object.keys(kana).map( kanaSet => (
          <div className={ 'options__box options__box__character' + (kanaSelected.includes(kanaSet) ? ' options__box--checked' : '') }>
            <input type="checkbox"
              id={ kana[kanaSet].name }
              value={ kanaSet }
              checked={ kanaSelected.includes(kanaSet) }
              onChange={ e => actions.toggleKana(e.target.value) }
            />
            <label htmlFor={ kana[kanaSet].name } className="options__box__character__label kana">
              <div className={ 'options__box__character__icon' + (kana[kanaSet].icon.length > 1 ? ' options__box__character__icon--combo' : '') }>{ kana[kanaSet].icon }</div>
              <div className="options__box__character__details">
                <h2>{ kana[kanaSet].name } ({ Object.keys(kana[kanaSet].characters).length })</h2>
                { kana[kanaSet].description && <p>{kana[kanaSet].description}</p> }
                <FontAwesomeIcon icon="check" className="options__box__check" />
              </div>
            </label>
          </div>
        ))}
      </div>
    )}
  </Consumer>

export default ChangeKana