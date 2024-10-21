import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChangeGameTimerProps {
  gameTimer: number;
  actions: {
    changeGameTimer: (seconds: number) => void;
  };
}

const ChangeGameTimer: FC<ChangeGameTimerProps> = ({ gameTimer, actions }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    actions.changeGameTimer(value);

    const gameTimeIcon = document.querySelector(".game-time-icon");
    if (value !== 0 && gameTimeIcon) {
      gameTimeIcon.classList.add("active");
    } else if (gameTimeIcon) {
      gameTimeIcon.classList.remove("active");
    }
  };

  return (
    <>
      <div className="input-label">Game time</div>
      <FontAwesomeIcon icon="clock" className="fa-fw game-time-icon" />
      <select
        className="input-control"
        onChange={handleChange}
        value={gameTimer}
      >
        <option value="0">No limit</option>
        <option value="30">30 seconds</option>
        <option value="60">1 minute</option>
        <option value="120">2 minutes</option>
        <option value="300">5 minutes</option>
        <option value="600">10 minutes</option>
        <option value="900">15 minutes</option>
      </select>
    </>
  );
};

export default ChangeGameTimer;
