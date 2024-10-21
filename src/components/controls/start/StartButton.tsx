import { FC } from "react";
import { Link } from "react-router-dom";

interface StartButtonProps {
  kanaSelected: string[];
}

const isReadyToStart = (kanaSelected: string[]): boolean => {
  return kanaSelected.length > 0;
};

const StartButton: FC<StartButtonProps> = ({ kanaSelected }) => (
  <Link
    className="button start"
    to={isReadyToStart(kanaSelected) ? "/play" : "#"}
    onClick={() => {
      if (!isReadyToStart(kanaSelected)) {
        alert("Please select what you want to practice.");
      }
    }}
  >
    Start Game
  </Link>
);

export default StartButton;
