import React, { Component } from 'react'

/* Third party imports */
import { shuffle } from 'lodash'
import { isMobile, isTablet } from 'react-device-detect'

/* Character data */
import characterSets from '../../config/CharacterSets'

export const GameData = React.createContext()

export class Provider extends Component {
  state = {
    darkMode: false,
    characters: {},
    answerOptions: [],
    gameStart: false,
    gameStartTime: '',
    gameFinishTime: '',
    currentCharacter: '',
    currentAnswer: '',
    currentAnswerPrintable: '',
    correctAnswers: {},
    correctAnswersTotal: 0,
    wrongAnswers: {},
    wrongAnswersTotal: 0,
    lastAnswerWas: '',
    keyboardMode: isMobile || isTablet ? false : true,
    sound: true,
    kana: characterSets,
    currentKanaSet: {},
    kanaSelected: ['Hiragana', 'HiraganaDakuten', 'Katakana', 'KatakanaDakuten'],
    showWrongAnswerDialog: true,
    wrongAnswerDialogActive: false,
    showReport: false,
    // Answer timer
    answerTimer: 0,
    answerTimerKey: '',
    answerTimerTicking: true,
    // Game timer
    gameTimer: 0,
    gameTimerKey: 'gameKey',
    gameTimerTicking: true
  };

  // Set audio files
  audio = {
    'success': {
      'file': new Audio('success.ogg'),
      'volume': 0.5
    },
    'error': {
      'file': new Audio('error.ogg'),
      'volume': 0.5
    },
    'gameOver': {
      'file': new Audio('gameOver.ogg'),
      'volume': 0.5
    },
    'gameOverBad': {
      'file': new Audio('gameOverBad.ogg'),
      'volume': 0.2
    },
  }

  checkAnswer = (answer) => {
    const currentAnswer = this.state.currentAnswer;
    const userAnswer = answer.toLowerCase().trim();
    
    // If the answer is blank, do nothing
    if(userAnswer === '') return false;

    // Add the user answer to the state
    this.setState({ currentUserAnswer : userAnswer })

    // Stop the timer
    this.stopAnswerTimer()
    
    // If answer is wrong
    if(currentAnswer.findIndex(item => userAnswer === item.toLowerCase()) === -1) {
      this.playSound('error');
      this.setState(prev => ({
        wrongAnswerDialogActive: this.state.showWrongAnswerDialog ? true : false,
        wrongAnswersTotal: prev.wrongAnswersTotal + 1,
        lastAnswerWas: "wrong",
        wrongAnswers: { ...prev.wrongAnswers,
          [prev.currentCharacter] : parseInt(prev.wrongAnswers[prev.currentCharacter]) ? prev.wrongAnswers[prev.currentCharacter] + 1 : 1
        }
      }));
      
      if(!this.state.showWrongAnswerDialog) this.loadNewCharacter();

    } else { // Else, if it's right
      this.playSound('success');
      this.setState(prev => ({
        correctAnswersTotal: prev.correctAnswersTotal + 1,
        lastAnswerWas: "correct",
        correctAnswers: { ...prev.correctAnswers,
          [prev.currentCharacter] : parseInt(prev.correctAnswers[prev.currentCharacter]) ? prev.correctAnswers[prev.currentCharacter] + 1 : 1
        }
      }));
      
      // Clear the answer text box if it's visible
      if(this.state.keyboardMode) document.querySelector('#answer-keyboard').value = '';

      // Load new character
      this.loadNewCharacter();
    }
  }

  playSound = (sound) => {
    if(this.state.sound) {
      this.audio[sound].file.volume = this.audio[sound].volume ?? 1; // Check if we set the volume manually above
      this.audio[sound].file.currentTime = 0; // Reset to audio beginning if it's already playing
      this.audio[sound].file.play();
    }
  }

  startGame = () => {
    this.setState({
      gameStart: true,
      gameStartTime: new Date().getTime(),
      answerTimerTicking: true,
      gameTimerTicking: true
    }, this.loadNewCharacter) // Set gameStart state to true and load a new character
  }

  endGame = () => {
    this.stopAnswerTimer();
    this.stopGameTimer();
    this.setState({ gameFinishTime : new Date().getTime() });

    if(this.state.correctAnswersTotal === 0 && this.state.wrongAnswersTotal === 0) {
      this.clearStats();
    } else {
      this.toggleReport();
      
      // If the total number of wrong answers is more than correct answers, play the 'bad game over' sound
      this.playSound(this.state.wrongAnswersTotal > this.state.correctAnswersTotal ? 'gameOverBad' : 'gameOver');
    }
  }

  clearStats = () => 
    this.setState({
      gameStart: false,
      correctAnswers: {},
      correctAnswersTotal: 0,
      wrongAnswers: {},
      wrongAnswersTotal: 0,
      lastAnswerWas: ''
    })

  stopAnswerTimer = () => this.setState(({ answerTimerTicking: false }))
  startAnswerTimer = () => this.setState(({ answerTimerTicking: true }))
  stopGameTimer = () => this.setState(({ gameTimerTicking: false }))
  startGameTimer = () => this.setState(({ gameTimerTicking: true }))
  toggleSound = () => this.setState(prev => ({ sound: !prev.sound }))
  toggleInput = () => this.setState(prev => ({ keyboardMode: !prev.keyboardMode }))
  
  toggleDarkMode = () => {
    this.setState( prev => ({ darkMode: !prev.darkMode }), () => {
      window.localStorage.setItem('darkMode', this.state.darkMode);
      this.handleDarkMode();
    });
  }

  handleDarkMode = () => {
    if(this.state.darkMode === true) {
      document.querySelector('body').classList.add('dark');
    } else {
      document.querySelector('body').classList.remove('dark');
    }
  }

  // Add or remove the passed kana set name to the kana array in the state
  toggleKana = (kana, overrideSelected = null) => {
    let newKanaSelection = this.state.kanaSelected
    
    if((!newKanaSelection.includes(kana) && overrideSelected === null) || (!newKanaSelection.includes(kana) && overrideSelected === 1)) {
      newKanaSelection.push(kana)
    } else if((newKanaSelection.includes(kana) && overrideSelected === null) || overrideSelected === 0) {
      newKanaSelection.splice(newKanaSelection.indexOf(kana), 1)
    }
    
    this.setState({ kanaSelected: newKanaSelection }, this.loadKana)
  }

  changeAnswerTimer = (seconds) => this.setState({ answerTimer: parseInt(seconds) })
  changeGameTimer = (seconds) => this.setState({ gameTimer: parseInt(seconds) })
  toggleWrongAnswerDialog = () => this.setState( prev => ({ showWrongAnswerDialog: !prev.showWrongAnswerDialog }))
  hideWrongAnswerDialog = () => this.setState({ wrongAnswerDialogActive: false })

  toggleReport = () =>
    this.setState( prev => ({
      showReport: !prev.showReport,
      wrongAnswerDialogActive: false
    }));

  // Loads the kana based on the current kana state
  loadKana = () => {
    // Create an empty object for new character set
    let newCharacterSet = {};
    // Go through each selected kana and insert it into the new character set object
    Object.keys(this.state.kana).forEach((kana) => newCharacterSet = {...newCharacterSet, ...this.state.kana[kana].characters})
    // Insert the new character set into the state
    this.setState({ characters: newCharacterSet });
  }

  // Loads a new character
  loadNewCharacter = () => {
    // Reset current user answer
    this.setState({ currentUserAnswer: false });

    // Pick a random character set from the selected sets
    const shuffledCharacterSets = shuffle(this.state.kanaSelected);
    const characterSet = shuffledCharacterSets.shift();

    // Assign the characters from the chosen set
    const characterSetData = this.state.kana[characterSet];
    const characters = characterSetData.characters;
    const shuffledCharacters = shuffle(Object.keys(characters)); // Shuffle the kana characters
    const shuffledCharactersUnique = [...new Set(shuffledCharacters)];
    
    // If the currentCharacter isn't empty (e.g. it's the first answer) then
    // delete it from the new set of characters that's being loaded so it
    // doesn't appear twice in a row
    if(this.state.currentCharacter.length)
      shuffledCharacters.splice(shuffledCharacters.indexOf(this.state.currentCharacter), 1)

    const character = shuffledCharacters.shift(); // Grab the first one
    const answer = characters[character]; // Grab the answer
    const answerPrintable = characterSetData.firstAnswerAsCorrection ? answer[0] : answer.join(' or '); // Make answer printable, join multiple answers with "or"

    // Get answer options; one right answer and some wrong answers while preventing duplicates from similar answers
    const answerOptions = [answer]
    shuffledCharactersUnique.slice(0, 10).forEach( char => {
      if(answerOptions.length < 5 && answer !== characters[char]) {
        answerOptions.push(characters[char]);
      }
    })
    
    // Update the state with new character's data
    this.setState({
      currentCharacter: character,
      currentAnswer: answer,
      currentAnswerPrintable: answerPrintable,
      currentKanaSet: characterSetData,
      answerOptions: shuffle(answerOptions),
      answerTimerKey: character,
    })

    // Start the answer timer
    this.startAnswerTimer()

    return character;
  }

  componentDidMount() {
    // Check if darkMode was set previously
    if(window.localStorage.getItem('darkMode')) {
      this.setState({
        darkMode: (window.localStorage.getItem('darkMode') === "true")
      }, () => this.handleDarkMode())
    }
    
    // Load the kana set
    this.loadKana()
  }

  render() {
    return (
      <GameData.Provider value={{
        darkMode: this.state.darkMode,
        characters: this.state.characters,
        answers: this.state.answers,
        answerOptions: this.state.answerOptions,
        gameStart: this.state.gameStart,
        gameStartTime: this.state.gameStartTime,
        gameFinishTime: this.state.gameFinishTime,
        currentCharacter: this.state.currentCharacter,
        currentAnswer: this.state.currentAnswer,
        currentAnswerPrintable: this.state.currentAnswerPrintable,
        correctAnswersTotal: this.state.correctAnswersTotal,
        currentUserAnswer: this.state.currentUserAnswer,
        currentKanaSet: this.state.currentKanaSet,
        wrongAnswers: this.state.wrongAnswers,
        wrongAnswersTotal: this.state.wrongAnswersTotal,
        lastAnswerWas: this.state.lastAnswerWas,
        keyboardMode: this.state.keyboardMode,
        sound: this.state.sound,
        kana: this.state.kana,
        kanaSelected: this.state.kanaSelected,
        answerTimer: this.state.answerTimer,
        answerTimerKey: this.state.answerTimerKey,
        answerTimerTicking: this.state.answerTimerTicking,
        gameTimer: this.state.gameTimer,
        gameTimerKey: this.state.gameTimerKey,
        gameTimerTicking: this.state.gameTimerTicking,
        showWrongAnswerDialog: this.state.showWrongAnswerDialog,
        wrongAnswerDialogActive: this.state.wrongAnswerDialogActive,
        showReport: this.state.showReport,
        actions: {
          loadKana: this.loadKana,
          loadNewCharacter: this.loadNewCharacter,
          toggleKana: this.toggleKana,
          toggleSound: this.toggleSound,
          toggleInput: this.toggleInput,
          toggleDarkMode: this.toggleDarkMode,
          startGame: this.startGame,
          endGame: this.endGame,
          clearStats: this.clearStats,
          hideWrongAnswerDialog: this.hideWrongAnswerDialog,
          toggleWrongAnswerDialog: this.toggleWrongAnswerDialog,
          toggleReport: this.toggleReport,
          checkAnswer: this.checkAnswer,
          changeAnswerTimer: this.changeAnswerTimer,
          changeGameTimer: this.changeGameTimer
        }
      }}>
        { this.props.children }
      </GameData.Provider>
    )
  }
}

export const Consumer = GameData.Consumer