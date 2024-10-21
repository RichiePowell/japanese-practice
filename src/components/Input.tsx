import React from "react";
import InputKeyboard from "./InputKeyboard";
import InputChoices from "./InputChoices";

interface InputProps {
  input?: string;
  keyboardMode: boolean;
}

const Input: React.FC<InputProps> = ({ input = "", keyboardMode }) => (
  <div className="answers">
    {keyboardMode && input !== "choices" ? <InputKeyboard /> : <InputChoices />}
  </div>
);

export default Input;
