import React, { useState, useEffect, useCallback, useMemo } from "react";
import { shuffle } from "lodash";
import { isMobile, isTablet } from "react-device-detect";
import characterSets from "../config/CharacterSets";

export const GameData = React.createContext();

export const Provider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [characters, setCharacters] = useState({});
  const [answerOptions, setAnswerOptions] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [gameStartTime, setGameStartTime] = useState("");
  const [gameFinishTime, setGameFinishTime] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentAnswerPrintable, setCurrentAnswerPrintable] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [correctAnswersTotal, setCorrectAnswersTotal] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [wrongAnswersTotal, setWrongAnswersTotal] = useState(0);
  const [lastAnswerWas, setLastAnswerWas] = useState("");
  const [keyboardMode, setKeyboardMode] = useState(
    isMobile || isTablet ? false : true
  );
  const [sound, setSound] = useState(true);
  const [kana, setKana] = useState(characterSets);
  const [currentKanaSet, setCurrentKanaSet] = useState({});
  const [kanaSelected, setKanaSelected] = useState([
    "Hiragana",
    "HiraganaDakuten",
    "Katakana",
    "KatakanaDakuten",
  ]);
  const [showWrongAnswerDialog, setShowWrongAnswerDialog] = useState(true);
  const [wrongAnswerDialogActive, setWrongAnswerDialogActive] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [answerTimer, setAnswerTimer] = useState(0);
  const [answerTimerKey, setAnswerTimerKey] = useState("");
  const [answerTimerTicking, setAnswerTimerTicking] = useState(true);
  const [gameTimer, setGameTimer] = useState(0);
  const [gameTimerKey, setGameTimerKey] = useState("gameKey");
  const [gameTimerTicking, setGameTimerTicking] = useState(true);
  const [currentUserAnswer, setCurrentUserAnswer] = useState(false);

  // Set audio files
  const audio = {
    success: {
      file: new Audio("success.ogg"),
      volume: 0.5,
    },
    error: {
      file: new Audio("error.ogg"),
      volume: 0.5,
    },
    gameOver: {
      file: new Audio("gameOver.ogg"),
      volume: 0.5,
    },
    gameOverBad: {
      file: new Audio("gameOverBad.ogg"),
      volume: 0.2,
    },
  };

  const playSound = useCallback(
    (soundName) => {
      if (sound && audio[soundName]) {
        const soundFile = audio[soundName].file;
        soundFile.volume = audio[soundName].volume ?? 1;
        soundFile.currentTime = 0;
        soundFile.play();
      }
    },
    [sound]
  );

  const checkAnswer = (answer) => {
    const userAnswer = answer.toLowerCase().trim();

    if (userAnswer === "") return false;

    setCurrentUserAnswer(userAnswer);
    stopAnswerTimer();

    if (
      currentAnswer.findIndex((item) => userAnswer === item.toLowerCase()) ===
      -1
    ) {
      playSound("error");
      setWrongAnswerDialogActive(showWrongAnswerDialog);
      setWrongAnswersTotal((prev) => prev + 1);
      setLastAnswerWas("wrong");
      setWrongAnswers((prev) => ({
        ...prev,
        [currentCharacter]: prev[currentCharacter]
          ? prev[currentCharacter] + 1
          : 1,
      }));

      if (!showWrongAnswerDialog) loadNewCharacter();
    } else {
      playSound("success");
      setCorrectAnswersTotal((prev) => prev + 1);
      setLastAnswerWas("correct");
      setCorrectAnswers((prev) => ({
        ...prev,
        [currentCharacter]: prev[currentCharacter]
          ? prev[currentCharacter] + 1
          : 1,
      }));

      if (keyboardMode) {
        const inputField = document.querySelector("#answer-keyboard");
        if (inputField) inputField.value = "";
      }

      loadNewCharacter();
    }
  };

  const startGame = () => {
    setGameStart(true);
    setGameStartTime(Date.now());
    setAnswerTimerTicking(true);
    setGameTimerTicking(true);
    loadNewCharacter();
  };

  const endGame = () => {
    stopAnswerTimer();
    stopGameTimer();
    setGameFinishTime(Date.now());

    if (correctAnswersTotal === 0 && wrongAnswersTotal === 0) {
      clearStats();
    } else {
      toggleReport();
      playSound(
        wrongAnswersTotal > correctAnswersTotal ? "gameOverBad" : "gameOver"
      );
    }
  };

  const clearStats = () => {
    setGameStart(false);
    setCorrectAnswers({});
    setCorrectAnswersTotal(0);
    setWrongAnswers({});
    setWrongAnswersTotal(0);
    setLastAnswerWas("");
  };

  const stopAnswerTimer = () => setAnswerTimerTicking(false);
  const startAnswerTimer = () => setAnswerTimerTicking(true);
  const stopGameTimer = () => setGameTimerTicking(false);
  const startGameTimer = () => setGameTimerTicking(true);
  const toggleSound = () => setSound((prev) => !prev);
  const toggleInput = () => setKeyboardMode((prev) => !prev);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    window.localStorage.setItem("darkMode", !darkMode);
    handleDarkMode();
  };

  const handleDarkMode = useCallback(() => {
    const bodyClass = document.body.classList;
    darkMode ? bodyClass.add("dark") : bodyClass.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    handleDarkMode();
  }, [handleDarkMode]);

  const toggleKana = (kanaToToggle) => {
    setKanaSelected((prevKanaSelected) => {
      if (prevKanaSelected.includes(kanaToToggle)) {
        return prevKanaSelected.filter((kana) => kana !== kanaToToggle);
      } else {
        return [...prevKanaSelected, kanaToToggle];
      }
    });
  };

  const toggleAllKana = (checked) => {
    const newKanaSelection = checked ? Object.keys(kana) : [];
    setKanaSelected(newKanaSelection);
    loadKana(newKanaSelection);
  };

  useEffect(() => {
    loadKana(kanaSelected);
  }, [kanaSelected]);

  const changeAnswerTimer = (seconds) => setAnswerTimer(parseInt(seconds));
  const changeGameTimer = (seconds) => setGameTimer(parseInt(seconds));
  const toggleWrongAnswerDialog = () =>
    setShowWrongAnswerDialog((prev) => !prev);
  const hideWrongAnswerDialog = () => setWrongAnswerDialogActive(false);

  const toggleReport = () => {
    setShowReport((prev) => !prev);
    setWrongAnswerDialogActive(false);
  };

  const loadKana = (selectedKana = kanaSelected) => {
    let newCharacterSet = {};
    selectedKana.forEach((kanaKey) => {
      if (kana[kanaKey]) {
        newCharacterSet = {
          ...newCharacterSet,
          ...kana[kanaKey].characters,
        };
      }
    });
    setCharacters(newCharacterSet);
  };

  const loadNewCharacter = () => {
    setCurrentUserAnswer(false);

    const shuffledKanaSets = shuffle(kanaSelected);
    const selectedSet = shuffledKanaSets[0];

    const selectedKanaData = kana[selectedSet];
    const kanaCharacters = selectedKanaData.characters;
    let shuffledCharacters = shuffle(Object.keys(kanaCharacters));

    if (currentCharacter) {
      shuffledCharacters = shuffledCharacters.filter(
        (char) => char !== currentCharacter
      );
    }

    const character = shuffledCharacters[0];
    const answer = kanaCharacters[character];
    const answerPrintable = selectedKanaData.firstAnswerAsCorrection
      ? answer[0]
      : answer.join(" or ");

    const options = [answer];
    const uniqueCharacters = [...new Set(shuffledCharacters)];
    uniqueCharacters.slice(0, 10).forEach((char) => {
      if (
        options.length < 5 &&
        answer !== kanaCharacters[char] &&
        !options.includes(kanaCharacters[char])
      ) {
        options.push(kanaCharacters[char]);
      }
    });

    setCurrentCharacter(character);
    setCurrentAnswer(answer);
    setCurrentAnswerPrintable(answerPrintable);
    setCurrentKanaSet(selectedKanaData);
    setAnswerOptions(shuffle(options));
    setAnswerTimerKey(character);
    startAnswerTimer();
  };

  useEffect(() => {
    const storedDarkMode = window.localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === "true");
    }
    loadKana();
  }, []);

  const contextValue = useMemo(
    () => ({
      darkMode,
      characters,
      answerOptions,
      gameStart,
      gameStartTime,
      gameFinishTime,
      currentCharacter,
      currentAnswer,
      currentAnswerPrintable,
      correctAnswersTotal,
      currentUserAnswer,
      currentKanaSet,
      wrongAnswers,
      wrongAnswersTotal,
      lastAnswerWas,
      keyboardMode,
      sound,
      kana,
      kanaSelected,
      answerTimer,
      answerTimerKey,
      answerTimerTicking,
      gameTimer,
      gameTimerKey,
      gameTimerTicking,
      showWrongAnswerDialog,
      wrongAnswerDialogActive,
      showReport,
      actions: {
        loadKana,
        loadNewCharacter,
        toggleKana,
        toggleAllKana,
        toggleSound,
        toggleInput,
        toggleDarkMode,
        startGame,
        endGame,
        clearStats,
        hideWrongAnswerDialog,
        toggleWrongAnswerDialog,
        toggleReport,
        checkAnswer,
        changeAnswerTimer,
        changeGameTimer,
      },
    }),
    [
      darkMode,
      characters,
      answerOptions,
      gameStart,
      gameStartTime,
      gameFinishTime,
      currentCharacter,
      currentAnswer,
      currentAnswerPrintable,
      correctAnswersTotal,
      currentUserAnswer,
      currentKanaSet,
      wrongAnswers,
      wrongAnswersTotal,
      lastAnswerWas,
      keyboardMode,
      sound,
      kana,
      kanaSelected,
      answerTimer,
      answerTimerKey,
      answerTimerTicking,
      gameTimer,
      gameTimerKey,
      gameTimerTicking,
      showWrongAnswerDialog,
      wrongAnswerDialogActive,
      showReport,
    ]
  );

  // **Add this return statement**
  return <GameData.Provider value={contextValue}>{children}</GameData.Provider>;
};

export const Consumer = GameData.Consumer;
