import { FC } from "react";

interface InputToggleProps {
  actions: {
    toggleInput: () => void;
  };
}

const InputToggle: FC<InputToggleProps> = ({ actions }) => (
  <button className="input-control" onClick={actions.toggleInput}>
    Toggle input
  </button>
);

export default InputToggle;
