import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  FC,
} from "react";
import { shuffle } from "lodash";
import { isMobile, isTablet } from "react-device-detect";
import characterSets from "../config/CharacterSets";
import { CharacterSet } from "../types/CharacterSetTypes";
import Swal from "sweetalert2";
import GameOverModalContent from "../components/modals/GameOver";
import { AudioFile } from "../types/AudioTypes";
import { useNavigate } from "react-router-dom";

type SoundName = "success" | "error" | "gameOver" | "gameOverBad";

interface GameActions {
  loadKana: (selectedKana?: string[]) => void;
  loadNewCharacter: () => void;
  toggleKana: (kanaToToggle: string) => void;
  toggleAllKana: (checked: boolean) => void;
  toggleSound: () => void;
  toggleInput: () => void;
  toggleDarkMode: () => void;
  startGame: () => void;
  endGame: () => void;
  clearStats: () => void;
  hideWrongAnswerDialog: () => void;
  toggleWrongAnswerDialog: () => void;
  toggleReport: () => void;
  checkAnswer: (answer: string) => void;
  changeAnswerTimer: (seconds: number) => void;
  changeGameTimer: (seconds: number) => void;
  stopGameTimer: () => void;
  startGameTimer: () => void;
  stopAnswerTimer: () => void;
  startAnswerTimer: () => void;
}

interface GameDataContext {
  darkMode: boolean;
  characters: Record<string, any>;
  answerOptions: any[];
  gameStart: boolean;
  gameStartTime: number | null;
  gameFinishTime: number | null;
  currentCharacter: string;
  currentAnswer: string[];
  currentAnswerPrintable: string;
  correctAnswers: Record<string, number>;
  correctAnswersTotal: number;
  currentUserAnswer: string | false;
  currentKanaSet: CharacterSet | null;
  wrongAnswers: Record<string, number>;
  wrongAnswersTotal: number;
  lastAnswerWas: string;
  keyboardMode: boolean;
  sound: boolean;
  kana: Record<string, CharacterSet>;
  kanaSelected: string[];
  answerTimer: number;
  answerTimerKey: string;
  answerTimerTicking: boolean;
  gameTimer: number;
  gameTimerKey: string;
  gameTimerTicking: boolean;
  showWrongAnswerDialog: boolean;
  wrongAnswerDialogActive: boolean;
  showReport: boolean;
  actions: GameActions;
}

interface ProviderProps {
  children: ReactNode;
}

const defaultGameData: GameDataContext = {
  darkMode: false,
  characters: {},
  answerOptions: [],
  gameStart: false,
  gameStartTime: null,
  gameFinishTime: null,
  currentCharacter: "",
  currentAnswer: [],
  currentAnswerPrintable: "",
  correctAnswers: {},
  correctAnswersTotal: 0,
  currentUserAnswer: false,
  currentKanaSet: null,
  wrongAnswers: {},
  wrongAnswersTotal: 0,
  lastAnswerWas: "",
  keyboardMode: !(isMobile || isTablet),
  sound: true,
  kana: characterSets, // Assuming characterSets is defined correctly elsewhere
  kanaSelected: ["Hiragana", "HiraganaDakuten", "Katakana", "KatakanaDakuten"],
  answerTimer: 0,
  answerTimerKey: "",
  answerTimerTicking: true,
  gameTimer: 0,
  gameTimerKey: "gameKey",
  gameTimerTicking: true,
  showWrongAnswerDialog: true,
  wrongAnswerDialogActive: false,
  showReport: false,
  actions: {
    loadKana: () => {},
    loadNewCharacter: () => {},
    toggleKana: () => {},
    toggleAllKana: () => {},
    toggleSound: () => {},
    toggleInput: () => {},
    toggleDarkMode: () => {},
    startGame: () => {},
    endGame: () => {},
    clearStats: () => {},
    hideWrongAnswerDialog: () => {},
    toggleWrongAnswerDialog: () => {},
    toggleReport: () => {},
    checkAnswer: () => {},
    changeAnswerTimer: () => {},
    changeGameTimer: () => {},
    stopGameTimer: () => {},
    startGameTimer: () => {},
    stopAnswerTimer: () => {},
    startAnswerTimer: () => {},
  },
};

// Initialize the context with the default value
export const GameData = React.createContext<GameDataContext>(defaultGameData);

export const Provider: FC<ProviderProps> = ({ children }) => {
  // Instead of hardcoded default values, use values from defaultGameData
  const [darkMode, setDarkMode] = useState<boolean>(defaultGameData.darkMode);
  const [characters, setCharacters] = useState<Record<string, any>>(
    defaultGameData.characters
  );
  const [answerOptions, setAnswerOptions] = useState<any[]>(
    defaultGameData.answerOptions
  );
  const [gameStart, setGameStart] = useState<boolean>(
    defaultGameData.gameStart
  );
  const [gameStartTime, setGameStartTime] = useState<number | null>(
    defaultGameData.gameStartTime
  );
  const [gameFinishTime, setGameFinishTime] = useState<number | null>(
    defaultGameData.gameFinishTime
  );
  const [currentCharacter, setCurrentCharacter] = useState<string>(
    defaultGameData.currentCharacter
  );
  const [currentAnswer, setCurrentAnswer] = useState<string[]>(
    defaultGameData.currentAnswer
  );
  const [currentAnswerPrintable, setCurrentAnswerPrintable] = useState<string>(
    defaultGameData.currentAnswerPrintable
  );
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, number>>(
    defaultGameData.correctAnswers
  );
  const [correctAnswersTotal, setCorrectAnswersTotal] = useState<number>(
    defaultGameData.correctAnswersTotal
  );
  const [wrongAnswers, setWrongAnswers] = useState<Record<string, number>>(
    defaultGameData.wrongAnswers
  );
  const [wrongAnswersTotal, setWrongAnswersTotal] = useState<number>(
    defaultGameData.wrongAnswersTotal
  );
  const [lastAnswerWas, setLastAnswerWas] = useState<string>(
    defaultGameData.lastAnswerWas
  );
  const [keyboardMode, setKeyboardMode] = useState<boolean>(
    defaultGameData.keyboardMode
  );
  const [sound, setSound] = useState<boolean>(defaultGameData.sound);
  const [kana, setKana] = useState<Record<string, CharacterSet>>(
    defaultGameData.kana
  );
  const [currentKanaSet, setCurrentKanaSet] = useState<CharacterSet | null>(
    defaultGameData.currentKanaSet
  );
  const [kanaSelected, setKanaSelected] = useState<string[]>(
    defaultGameData.kanaSelected
  );
  const [showWrongAnswerDialog, setShowWrongAnswerDialog] = useState<boolean>(
    defaultGameData.showWrongAnswerDialog
  );
  const [wrongAnswerDialogActive, setWrongAnswerDialogActive] =
    useState<boolean>(defaultGameData.wrongAnswerDialogActive);
  const [showReport, setShowReport] = useState<boolean>(
    defaultGameData.showReport
  );
  const [answerTimer, setAnswerTimer] = useState<number>(
    defaultGameData.answerTimer
  );
  const [answerTimerKey, setAnswerTimerKey] = useState<string>(
    defaultGameData.answerTimerKey
  );
  const [answerTimerTicking, setAnswerTimerTicking] = useState<boolean>(
    defaultGameData.answerTimerTicking
  );
  const [gameTimer, setGameTimer] = useState<number>(defaultGameData.gameTimer);
  const [gameTimerKey, setGameTimerKey] = useState<string>(
    defaultGameData.gameTimerKey
  );
  const [gameTimerTicking, setGameTimerTicking] = useState<boolean>(
    defaultGameData.gameTimerTicking
  );
  const [currentUserAnswer, setCurrentUserAnswer] = useState<string | false>(
    defaultGameData.currentUserAnswer
  );
  const navigate = useNavigate();

  const audio: Record<SoundName, AudioFile> = {
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
    (soundName: SoundName) => {
      if (sound && audio[soundName]) {
        const soundFile = audio[soundName].file;
        soundFile.volume = audio[soundName].volume ?? 1;
        soundFile.currentTime = 0;
        soundFile.play();
      }
    },
    [sound]
  );

  const stopAnswerTimer = () => setAnswerTimerTicking(false);
  const startAnswerTimer = () => setAnswerTimerTicking(true);
  const stopGameTimer = () => setGameTimerTicking(false);
  const startGameTimer = () => setGameTimerTicking(true);

  const checkAnswer = (answer: string) => {
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
        const inputField =
          document.querySelector<HTMLInputElement>("#answer-keyboard");
        if (inputField) inputField.value = "";
      }

      loadNewCharacter();
    }
  };

  const startGame = () => {
    if (!gameStart) {
      setGameStart(true);
      setGameStartTime(Date.now());
      setAnswerTimerTicking(true);
      setGameTimerTicking(true);
      loadNewCharacter();
    }
  };

  const endGame = () => {
    if (gameStart) {
      console.log("endGame is triggered");
      stopAnswerTimer();
      stopGameTimer();
      setGameFinishTime(Date.now());

      if (correctAnswersTotal === 0 && wrongAnswersTotal === 0) {
        clearStats();
        navigate("/");
      } else {
        setShowReport(true);
        playSound(
          wrongAnswersTotal > correctAnswersTotal ? "gameOverBad" : "gameOver"
        );
      }
      setGameStart(false);
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

  const toggleSound = () => setSound((prev) => !prev);
  const toggleInput = () => setKeyboardMode((prev) => !prev);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    window.localStorage.setItem("darkMode", (!darkMode).toString());
    handleDarkMode();
  };

  const handleDarkMode = useCallback(() => {
    const bodyClass = document.body.classList;
    darkMode ? bodyClass.add("dark") : bodyClass.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    handleDarkMode();
  }, [handleDarkMode]);

  const toggleKana = (kanaToToggle: string) => {
    setKanaSelected((prevKanaSelected) => {
      if (prevKanaSelected.includes(kanaToToggle)) {
        return prevKanaSelected.filter((kana) => kana !== kanaToToggle);
      } else {
        return [...prevKanaSelected, kanaToToggle];
      }
    });
  };

  const toggleAllKana = (checked: boolean) => {
    const newKanaSelection = checked ? Object.keys(kana) : [];
    setKanaSelected(newKanaSelection);
    loadKana(newKanaSelection);
  };

  useEffect(() => {
    loadKana(kanaSelected);
  }, [kanaSelected]);

  const changeAnswerTimer = (seconds: number) =>
    setAnswerTimer(parseInt(seconds.toString()));
  const changeGameTimer = (seconds: number) =>
    setGameTimer(parseInt(seconds.toString()));
  const toggleWrongAnswerDialog = () =>
    setShowWrongAnswerDialog((prev) => !prev);
  const hideWrongAnswerDialog = () => setWrongAnswerDialogActive(false);

  const toggleReport = () => {
    setShowReport((prev) => !prev);
    setWrongAnswerDialogActive(false);
  };

  const loadKana = (selectedKana = kanaSelected) => {
    let newCharacterSet: Record<string, any> = {};
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
    const kanaCharacters: Record<string, string[]> =
      selectedKanaData.characters;
    let shuffledCharacters = shuffle(Object.keys(kanaCharacters));

    if (currentCharacter) {
      shuffledCharacters = shuffledCharacters.filter(
        (char: string) => char !== currentCharacter
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

  useEffect(() => {
    if (showReport) {
      Swal.fire({
        title: "Game Over!",
        html: GameOverModalContent({
          gameFinishTime,
          gameStartTime,
          wrongAnswersTotal,
          correctAnswersTotal,
          wrongAnswers,
          characters,
        }),
        confirmButtonText: "OK",
      }).then(() => {
        setShowReport(false);
        clearStats();
        navigate("/");
      });
    }
  }, [showReport, correctAnswersTotal, wrongAnswersTotal, clearStats]);

  const contextValue = useMemo<GameDataContext>(
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
      correctAnswers,
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
        stopGameTimer,
        startGameTimer,
        stopAnswerTimer,
        startAnswerTimer,
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

  return <GameData.Provider value={contextValue}>{children}</GameData.Provider>;
};

export const Consumer = GameData.Consumer;
