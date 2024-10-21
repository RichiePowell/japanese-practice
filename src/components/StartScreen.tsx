import { useContext } from "react";
import { GameData } from "../context/GameData";
import Header from "./Header";
import CharacterSelection from "./controls/start/CharacterSelection";
import Options from "./controls/start/Options";
import Audio from "./controls/Audio";
import DarkMode from "./controls/DarkMode";
import StartButton from "./controls/start/StartButton";

const StartScreen: React.FC = () => {
  const gameData = useContext(GameData);

  if (!gameData) {
    return <div>Loading...</div>;
  }

  const {
    kana,
    kanaSelected,
    answerTimer,
    gameTimer,
    showWrongAnswerDialog,
    sound,
    actions,
  } = gameData;

  return (
    <div className="start-screen">
      <Header />

      {kana && kanaSelected ? (
        <CharacterSelection
          kana={kana}
          kanaSelected={kanaSelected}
          actions={actions}
        />
      ) : (
        <div>Loading kana...</div>
      )}

      <Options
        answerTimer={answerTimer}
        gameTimer={gameTimer}
        showWrongAnswerDialog={showWrongAnswerDialog}
        actions={actions}
      />

      <div className="text-center">
        <Audio sound={sound} actions={actions} />
        <StartButton kanaSelected={kanaSelected} />
        <DarkMode actions={actions} />
      </div>
    </div>
  );
};

export default StartScreen;
