import React, { useRef, FormEvent } from "react";
import { GameData } from "../context/GameData";

const InputKeyboard: React.FC = () => {
  const answer = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    checkAnswer: (answer: string) => void
  ) => {
    e.preventDefault();
    if (answer.current) {
      const currentAnswer = answer.current.value;
      checkAnswer(currentAnswer);
      answer.current.focus();
      e.currentTarget.reset();
    }
  };

  return (
    <GameData.Consumer>
      {({ actions }) => (
        <form
          className="input"
          onSubmit={(e) => handleSubmit(e, actions.checkAnswer)}
        >
          <input
            id="answer-keyboard"
            name="answer"
            ref={answer}
            type="text"
            className="answer"
            placeholder="Enter answer..."
            autoFocus
          />
          <input type="submit" value="Check" className="submit" />
        </form>
      )}
    </GameData.Consumer>
  );
};

export default InputKeyboard;
