import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChangeAnswerTimerProps {
  answerTimer: number;
  actions: {
    changeAnswerTimer: (seconds: number) => void;
  };
}

const ChangeAnswerTimer: FC<ChangeAnswerTimerProps> = ({
  answerTimer,
  actions,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    actions.changeAnswerTimer(value);

    const answerTimeIcon = document.querySelector(".answer-time-icon");
    if (value !== 0 && answerTimeIcon) {
      answerTimeIcon.classList.add("active");
    } else if (answerTimeIcon) {
      answerTimeIcon.classList.remove("active");
    }
  };

  const items = [];
  for (let i = 1; i <= 10; i++) {
    items.push(
      <option value={i} key={i}>
        {i} second{i > 1 ? "s" : ""}
      </option>
    );
  }

  return (
    <div className="float-right">
      <div className="input-label">Time to answer</div>
      <FontAwesomeIcon icon="stopwatch" className="fa-fw answer-time-icon" />
      <select
        className="input-control"
        onChange={handleChange}
        value={answerTimer}
      >
        <option value="0">No limit</option>
        {items}
      </select>
    </div>
  );
};

export default ChangeAnswerTimer;
