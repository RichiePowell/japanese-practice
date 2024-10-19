import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CharacterSelection = ({ kana, kanaSelected, actions }) => {
  const CountCharacters = () => {
    let count = 0;

    kanaSelected.forEach((kanaSet) => {
      count += Object.keys(kana[kanaSet].characters).length;
    });

    return count;
  };

  const toggleAll = (checked) => {
    Object.keys(kana).forEach((kanaSet) => {
      actions.toggleKana(kanaSet, checked ? 1 : 0);
    });
  };

  useEffect(() => {
    console.log(kanaSelected.length, Object.keys(kana).length);
    if (kanaSelected.length === 0) {
      document.getElementById("toggleAll").checked = false;
    } else if (kanaSelected.length === Object.keys(kana).length) {
      document.getElementById("toggleAll").checked = true;
    }
  });

  return (
    <>
      <div className="characters-header">
        <div className="characters-header__toggle">
          <input
            type="checkbox"
            id="toggleAll"
            className="checkbox__box__input"
            onChange={(e) => toggleAll(e.target.checked)}
          />
          <label className="checkbox checkbox--right" htmlFor="toggleAll">
            Toggle all
            <div className="checkbox__box">
              <FontAwesomeIcon icon="check" className="checkbox__box__check" />
            </div>
          </label>
        </div>
        <div className="characters-header__count">
          {kanaSelected.length} selected ({CountCharacters()} cards)
        </div>
      </div>
      <div className="options options--rows">
        {Object.keys(kana).map((kanaSet) => (
          <div
            className={
              "options__box options__box__character" +
              (kanaSelected.includes(kanaSet) ? " options__box--checked" : "")
            }
            key={kanaSet}
          >
            <input
              type="checkbox"
              id={kana[kanaSet].name}
              value={kanaSet}
              checked={kanaSelected.includes(kanaSet)}
              onChange={(e) => actions.toggleKana(e.target.value)}
            />
            <label
              htmlFor={kana[kanaSet].name}
              className="options__box__character__label kana"
            >
              <div
                className={
                  "options__box__character__icon" +
                  (kana[kanaSet].icon.length > 1
                    ? " options__box__character__icon--combo"
                    : "")
                }
              >
                {kana[kanaSet].icon}
              </div>
              <div className="options__box__character__details">
                <h2>
                  {kana[kanaSet].name} (
                  {Object.keys(kana[kanaSet].characters).length})
                </h2>
                {kana[kanaSet].description && (
                  <p>{kana[kanaSet].description}</p>
                )}
                <FontAwesomeIcon icon="check" className="options__box__check" />
              </div>
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterSelection;
