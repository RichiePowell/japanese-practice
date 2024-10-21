import { Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faVolumeUp,
  faVolumeMute,
  faSpinner,
  faCheck,
  faTimes,
  faInfinity,
  faStopwatch,
  faClock,
  faAdjust,
} from "@fortawesome/free-solid-svg-icons";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
import "./assets/scss/App.scss";

// Add FontAwesome icons via library
library.add(
  faVolumeUp,
  faVolumeMute,
  faSpinner,
  faCheck,
  faTimes,
  faInfinity,
  faStopwatch,
  faClock,
  faAdjust
);

// Add web fonts
WebFont.load({
  google: {
    families: ["Kaushan Script", "Source Sans Pro"],
  },
});

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/play" element={<Game />} />
        </Routes>
      </div>

      <FontAwesomeIcon icon="spinner" spin className="loading" />
    </div>
  );
};

export default App;
