import React from "react";
import { GameData } from "../context/GameData";

interface AnswerOption {
  [index: number]: string;
}

const setContainsWord = (set: AnswerOption[]): boolean => {
  return set.some((answers) => {
    return answers[0].length > 3;
  });
};

const InputChoices: React.FC = () => (
  <GameData.Consumer>
    {({ answerOptions, actions }) => (
      <div
        className={`answer-options${
          setContainsWord(answerOptions) ? " answer-options--contains-word" : ""
        }`}
      >
        {answerOptions &&
          answerOptions.map((answers: string[], index: number) => {
            const answer = answers[0];
            return (
              <button
                key={answer + index}
                type="button"
                className={"answer-options__option"}
                name="answer"
                value={answer}
                onClick={() => actions.checkAnswer(answer)}
              >
                {answer}
              </button>
            );
          })}
      </div>
    )}
  </GameData.Consumer>
);

export default InputChoices;
