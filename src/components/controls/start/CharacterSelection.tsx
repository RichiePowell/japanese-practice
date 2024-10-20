import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Kana } from "../../../types/KanaTypes";

interface CharacterSelectionProps {
  kana: Kana;
  kanaSelected: string[];
  actions: {
    toggleKana: (kanaSet: string) => void;
    toggleAllKana: (checked: boolean) => void;
  };
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  kana,
  kanaSelected,
  actions,
}) => {
  const [isToggleAllChecked, setIsToggleAllChecked] = useState<boolean>(
    kanaSelected.length === Object.keys(kana).length
  );

  const countCharacters = (): number => {
    return kanaSelected.reduce(
      (count, kanaSet) => count + Object.keys(kana[kanaSet].characters).length,
      0
    );
  };

  const toggleAll = (checked: boolean): void => {
    setIsToggleAllChecked(checked);
    actions.toggleAllKana(checked);
  };

  useEffect(() => {
    setIsToggleAllChecked(kanaSelected.length === Object.keys(kana).length);
  }, [kanaSelected, kana]);

  return (
    <>
      <div className="characters-header">
        <div className="characters-header__toggle">
          <input
            type="checkbox"
            id="toggleAll"
            className="checkbox__box__input"
            checked={isToggleAllChecked}
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
          {kanaSelected.length} selected ({countCharacters()} cards)
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
