import { FC } from "react";
import ChangeAnswerTimer from "./ChangeAnswerTimer";
import ChangeGameTimer from "./ChangeGameTimer";
import ToggleShowCorrectAnswer from "./ToggleShowCorrectAnswer";

interface OptionsProps {
  answerTimer: number;
  gameTimer: number;
  showWrongAnswerDialog: boolean;
  actions: {
    changeAnswerTimer: (seconds: number) => void,
    changeGameTimer: (seconds: number) => void,
    toggleWrongAnswerDialog: (checked: boolean) => void,
  };
}

const Options: FC<OptionsProps> = ({
  answerTimer,
  gameTimer,
  showWrongAnswerDialog,
  actions,
}) => (
  <div className="options options--highlight">
    <ChangeAnswerTimer answerTimer={answerTimer} actions={actions} />
    <ChangeGameTimer gameTimer={gameTimer} actions={actions} />
    <ToggleShowCorrectAnswer
      showWrongAnswerDialog={showWrongAnswerDialog}
      actions={actions}
    />
  </div>
);

export default Options;
