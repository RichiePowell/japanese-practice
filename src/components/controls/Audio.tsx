import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AudioProps {
  sound: boolean;
  actions: {
    toggleSound: () => void;
  };
}

const Audio: FC<AudioProps> = ({ sound, actions }) => (
  <button
    className="input-control icon sound"
    onClick={actions.toggleSound}
    type="button"
  >
    <FontAwesomeIcon icon={sound ? "volume-up" : "volume-mute"} />
  </button>
);

export default Audio;
