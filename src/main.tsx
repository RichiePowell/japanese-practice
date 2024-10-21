import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider as GameDataProvider } from "./context/GameData"; // Use the Provider you created
import App from "./App";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <Router>
      <GameDataProvider>
        <App />
      </GameDataProvider>
    </Router>
  );
} else {
  console.error("Failed to find the root element.");
}
