import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GameData } from "../context/GameData";
import Header from "./Header";
import Score from "./Score";
import Character from "./Character";
import Input from "./Input";
import Controls from "./Controls";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const Game = () => {
  const context = useContext(GameData);

  if (!context) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  useEffect(() => {
    context.actions.startGame();

    return () => {
      console.log("Ending game due to unmount of Game.");
      context.actions.endGame();
    };
  }, []);

  const getAnswerCorrection = () => {
    let matchingCharacters: string[] = [];
    const currentKanaSetCharacters = context?.currentKanaSet?.characters;

    if (currentKanaSetCharacters) {
      Object.keys(currentKanaSetCharacters).forEach((character) => {
        currentKanaSetCharacters[character].forEach((answer: string) => {
          if (answer.toLowerCase() === context.currentUserAnswer) {
            matchingCharacters.push(character);
          }
        });
      });
    }

    return matchingCharacters.length > 0
      ? `<div class="uc-first"><strong>${
          context.currentUserAnswer
        }</strong> is <strong>${matchingCharacters.join(
          "</strong> or <strong>"
        )}</strong>.</div>`
      : "";
  };

  useEffect(() => {
    if (context?.wrongAnswerDialogActive) {
      context.actions.stopGameTimer();
      context.actions.stopAnswerTimer();

      Swal.fire({
        title: `${context.currentCharacter} is ${context.currentAnswerPrintable}`,
        html: getAnswerCorrection(),
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        context.actions.hideWrongAnswerDialog();
        context.actions.startGameTimer();
        context.actions.startAnswerTimer();
        context.actions.loadNewCharacter();
      });
    }
  }, [context?.wrongAnswerDialogActive]);

  return (
    <>
      <Header />
      <Score />
      <Character currentCharacter={context?.currentCharacter} />
      {context?.answerTimer > 0 && (
        <div className="countdown">
          <CountdownCircleTimer
            isPlaying={context.answerTimerTicking}
            key={context.answerTimerKey}
            size={250}
            onComplete={() => {
              context.actions.checkAnswer("Omae wa mou shindeiru");
            }}
            duration={context.answerTimer}
            colors={context.darkMode ? "#ad4e4e" : "#e67272"}
            trailColor="#00000000"
          />
        </div>
      )}
      {context?.gameTimer > 0 && (
        <div className="game-timer">
          <CountdownCircleTimer
            isPlaying={context.gameTimerTicking}
            key={context.gameTimerKey}
            size={50}
            onComplete={() => {
              console.log("Ending game due to countdown timer finishing.");
              context.actions.endGame();
              navigate("/");
              return { shouldRepeat: false };
            }}
            duration={context.gameTimer}
            colors="#ccc"
            trailColor="#666"
            strokeWidth={5}
          >
            {({ remainingTime }) =>
              remainingTime > 60
                ? Math.floor(remainingTime / 60) + "m"
                : remainingTime
            }
          </CountdownCircleTimer>
        </div>
      )}
      <Input
        input={context.currentKanaSet?.input}
        keyboardMode={context.keyboardMode}
      />
      <Controls />
    </>
  );
};

export default Game;
