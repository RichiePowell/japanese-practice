import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DarkModeProps {
  actions: {
    toggleDarkMode: () => void;
  };
}

const DarkMode: FC<DarkModeProps> = ({ actions }) => (
  <button
    className="input-control icon dark-mode"
    onClick={actions.toggleDarkMode}
  >
    <FontAwesomeIcon icon="adjust" />
  </button>
);

export default DarkMode;
