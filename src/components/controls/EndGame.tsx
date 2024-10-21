import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EndGameProps {
  endGame: () => void;
}

const EndGame: FC<EndGameProps> = ({ endGame }) => (
  <button className="input-control icon end" type="button" onClick={endGame}>
    <FontAwesomeIcon icon="times" />
  </button>
);

export default EndGame;
