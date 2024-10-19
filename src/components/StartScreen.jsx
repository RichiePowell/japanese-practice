import { useEffect, useContext } from "react";
import { GameData } from "../context";
import Swal from "sweetalert2";
import GameOverModalContent from "./modals/GameOver";
import Header from "./Header";
import CharacterSelection from "./controls/start/CharacterSelection";
import Options from "./controls/start/Options";
import Audio from "./controls/Audio";
import DarkMode from "./controls/DarkMode";
import StartButton from "./controls/start/StartButton";

const StartScreen = () => {
  const context = useContext(GameData);

  // Show SweetAlert when the game is over
  useEffect(() => {
    if (context.showReport) {
      Swal.fire({
        title: "Game Over!",
        html: GameOverModalContent(context),
        confirmButtonText: "OK",
      }).then(() => {
        context.actions.toggleReport();
        context.actions.clearStats();
      });
    }
  }, [context.showReport]); // Re-run when showReport changes

  return (
    <div className="start-screen">
      <Header />
      <CharacterSelection
        kana={context.kana}
        kanaSelected={context.kanaSelected}
        actions={context.actions}
      />
      <Options
        answerTimer={context.answerTimer}
        gameTimer={context.gameTimer}
        showWrongAnswerDialog={context.showWrongAnswerDialog}
        actions={context.actions}
      />
      <div className="text-center">
        <Audio sound={context.sound} actions={context.actions} />
        <StartButton kanaSelected={context.kanaSelected} />
        <DarkMode actions={context.actions} />
      </div>
    </div>
  );
};

export default StartScreen;
