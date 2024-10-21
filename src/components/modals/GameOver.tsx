interface GameOverData {
  gameFinishTime: number | null;
  gameStartTime: number | null;
  wrongAnswersTotal: number;
  correctAnswersTotal: number;
  wrongAnswers: Record<string, any>;
  characters: Record<string, string[]>;
}

const GameOverModalContent = (props: GameOverData): string => {
  const gameTime = (): string => {
    const totalSeconds = Math.floor(
      (props.gameFinishTime - props.gameStartTime) / 1000
    );
    const minutes = Math.floor(totalSeconds / 60);
    const minutesOutput = minutes > 0 ? `${minutes}m` : "";
    const secondsOutput = `${Math.floor(totalSeconds - minutes * 60)}s`;
    return `${minutesOutput} ${secondsOutput}`;
  };

  const answerTime = (): string => {
    const totalSeconds = Math.floor(
      (props.gameFinishTime - props.gameStartTime) /
        1000 /
        (props.wrongAnswersTotal + props.correctAnswersTotal)
    );
    const minutes = Math.floor(totalSeconds / 60);
    const minutesOutput = minutes > 0 ? `${minutes}m` : "";
    const secondsOutput = `${Math.floor(totalSeconds - minutes * 60)}s`;
    return `${minutesOutput} ${secondsOutput}`;
  };

  const wrongAnswers = Object.keys(props.wrongAnswers);
  let wrongAnswersOutput: string[] = [];

  wrongAnswers.forEach((character) => {
    const correctAnswers = props.characters[character][0];
    wrongAnswersOutput.push(`
      <div class="report-wrong-answers__item">
        <div class="report-wrong-answers__item__character">${character}</div>
        <div class="report-wrong-answers__item__answer">${correctAnswers}</div>
      </div>`);
  });

  const wrongAnswersHtml =
    wrongAnswers.length > 0
      ? `
    <div class="report-wrong-answers">
      <h3>Answers you got wrong:</h3>
      ${wrongAnswersOutput.join("")}
    </div>`
      : "";

  return `
    <div class="report-totals">
      <div class="report-totals__box time">
        <div class="report-totals__box__label">Time</div>
        <div class="report-totals__box__total">${gameTime()}</div>
      </div>
      <div class="report-totals__box time">
        <div class="report-totals__box__label">Avg. Answer</div>
        <div class="report-totals__box__total">${answerTime()}</div>
      </div>
      <div class="report-totals__box">
        <div class="report-totals__box__label">Correct</div>
        <div class="report-totals__box__total">${
          props.correctAnswersTotal
        }</div>
      </div>
      <div class="report-totals__box">
        <div class="report-totals__box__label">Wrong</div>
        <div class="report-totals__box__total">${props.wrongAnswersTotal}</div>
      </div>
    </div>
    ${wrongAnswersHtml}`;
};

export default GameOverModalContent;
