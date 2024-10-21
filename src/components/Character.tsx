import React from "react";

interface CharacterProps {
  currentCharacter: string;
}

const Character: React.FC<CharacterProps> = ({ currentCharacter }) => (
  <div
    className={
      "character" +
      (currentCharacter.length === 2
        ? " character--smaller"
        : currentCharacter.length > 2
        ? " character--word"
        : "")
    }
  >
    {currentCharacter}
  </div>
);

export default Character;
