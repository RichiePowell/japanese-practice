# Japanese Practice

A modern, interactive way to practice Japanese hiragana, katakana, and other word sets. This Vite-powered, React-based app combines the simplicity of flashcards with an engaging interface and customizable options.

Try the game online: [Japanese Practice](https://japanesepractice.app/)

## Features

- **Select Word Sets**: Choose from various categories like Hiragana, Katakana, and more.
- **Practice Mode**: Answer by typing or selecting the correct romaji for the presented character.
- **Customizable Game Settings**: Options include limiting game time and setting time per answer.
- **Feedback**: Performance stats including time taken, average answer time, correct/incorrect answers, and detailed feedback for incorrect guesses.
- **User-Friendly Interface**: Designed with a clean UI, the app allows for seamless interaction across devices.
- **Show Correct Answer Option**: Learn from mistakes instantly by toggling the 'Show Correct Answer After Mistake' feature.
- **Responsive Design**: Works on both desktop and mobile devices.

## Installation and Running

To run the app locally, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/en/) installed.

### Step 1: Install Dependencies

```

npm install

```

### Step 2: Start the App

```

npm run dev

```

Once started, the console will provide a local URL (typically `http://localhost:3000/`) to access the game in your browser.

## Available Scripts

In the project directory, the following commands are available:

### `npm run dev`

Runs the app in development mode. The page will reload when you make edits. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production into the `dist` folder. The build is optimized for the best performance.

### `npm run serve`

Serves the production build from the `dist` folder to preview locally.

## Progressive Web App (PWA)

This app is configured as a PWA using Vite's PWA plugin. The manifest includes offline capabilities and icons for various devices.

## Originally Inspired By

This project was originally inspired by [Daniel Griffiths'](https://github.com/Daniel-Griffiths/) [React Hiragana Katakana Game](https://github.com/Daniel-Griffiths/react-hiragana-katakana-game/).
