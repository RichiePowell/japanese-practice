import React from "react";
import { Consumer } from "../context";

const Score = () => (
  <Consumer>
    {({ lastAnswerWas, correctAnswersTotal, wrongAnswersTotal }) => (
      <div className="scores">
        <div
          className={
            "scores__total scores__total__correct" +
            (lastAnswerWas === "correct" ? " scores__total--active" : "")
          }
        >
          <div className="scores__total__title">Right</div>
          <span>{correctAnswersTotal}</span>
        </div>
        <div
          className={
            "scores__total scores__total__wrong" +
            (lastAnswerWas === "wrong" ? " scores__total--active" : "")
          }
        >
          <div className="scores__total__title">Wrong</div>
          <span>{wrongAnswersTotal}</span>
        </div>
      </div>
    )}
  </Consumer>
);

export default Score;
