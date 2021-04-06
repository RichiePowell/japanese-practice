import React from 'react'
import { Consumer } from './context'
import SweetAlert from 'sweetalert2-react'
import GameOverModalContent from './modals/GameOver'
import Header from './Header'
import CharacterSelection from './controls/start/CharacterSelection'
import Options from './controls/start/Options'
import Audio from './controls/Audio'
import DarkMode from './controls/DarkMode'
import StartButton from './controls/start/StartButton'

const StartScreen = () =>
  <Consumer>
    { context => (
      <div className="start-screen">
        <Header />
        <CharacterSelection
          kana={context.kana}
          kanaSelected={context.kanaSelected}
          actions={context.actions} />
        <Options
          answerTimer={context.answerTimer}
          gameTimer={context.gameTimer}
          showWrongAnswerDialog={context.showWrongAnswerDialog}
          actions={context.actions} />
        <div className="text-center">
          <Audio
            sound={context.sound}
            actions={context.actions} />
          <StartButton kanaSelected={context.kanaSelected} />
          <DarkMode actions={context.actions} />
        </div>
        <SweetAlert
          show={ context.showReport }
          title="Game Over!"
          onConfirm={() => {
              context.actions.toggleReport()
              context.actions.clearStats()
            }
          }
          html={ GameOverModalContent(context) }
        />
      </div>
    )}
  </Consumer>

export default StartScreen
