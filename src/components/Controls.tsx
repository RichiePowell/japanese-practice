import React from "react";
import { GameData } from "../context/GameData";
import Audio from "./controls/Audio";
import DarkMode from "./controls/DarkMode";
import InputToggle from "./controls/InputToggle";
import EndGame from "./controls/EndGame";

const Controls: React.FC = () => (
  <GameData.Consumer>
    {({ actions, sound }) => (
      <div className="controls">
        <Audio sound={sound} actions={actions} />
        <DarkMode actions={actions} />
        <InputToggle actions={actions} />
        <div className="float-right">
          <EndGame endGame={actions.endGame} />
        </div>
      </div>
    )}
  </GameData.Consumer>
);

export default Controls;
