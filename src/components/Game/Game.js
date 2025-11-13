import React from "react";

import Board from "../Board";
import EntryField from "../EntryField";
import Keyboard from "../Keyboard";

import { sample, setUpLettersInitial } from "../../utils";
import { WORDS } from "../../data";

import styles from "./Game.module.css";
import { checkGuess } from "../../game-helpers";
import { check } from "prettier";
import {
  GAME_STATUS,
  LETTER_STATUS,
  LETTERS,
  NUM_OF_GUESSES_ALLOWED,
} from "../../constants";
import BannerWin from "../BannerWin/BannerWin";
import BannerLose from "../BannerLose/BannerLose";

// Pick a random word on every pageload.
function Game() {
  const [answer, setAnwser] = React.useState(() => sample(WORDS));
  const [lettersStatus, setLettersStatus] = React.useState(
    setUpLettersInitial(LETTERS)
  );
  const [guesses, setGuesses] = React.useState([]);
  const [currentGuess, setCurrentGuess] = React.useState("");
  const [gameStatus, setGameStatus] = React.useState(
    GAME_STATUS.PLAYING
  );

  console.info({ answer });

  const handleResetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus(GAME_STATUS.PLAYING);
    setAnwser(sample(WORDS));
    setLettersStatus(setUpLettersInitial(LETTERS));
  };

  const handleKeyboardButtonPress = (keyInput) => {
    if (gameStatus !== GAME_STATUS.PLAYING) {
      return;
    }

    const key = keyInput.toUpperCase();

    if (key === "⌫") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (key === "↵") {
      handleSubmitGuess();
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const updateLettersStatus = (checkedGuess) => {
    const nextLettersStatus = { ...lettersStatus };
    checkedGuess.forEach(({ letter, status }) => {
      if (status === LETTER_STATUS.ABSENT) {
        nextLettersStatus[letter] = { letter, status };
      }
    });

    setLettersStatus(nextLettersStatus);
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5) {
      return;
    }

    const newGuess = checkGuess(currentGuess, answer);
    updateLettersStatus(newGuess);
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");
    checkIfGameOver(newGuesses);
  };

  const checkIfGameOver = (totalGuesses) => {
    const currentNumberOfGuesses = totalGuesses.length;
    const lastGuess = totalGuesses[currentNumberOfGuesses - 1]
      .map((obj) => obj.letter)
      .join("");

    if (lastGuess === answer) {
      setGameStatus(GAME_STATUS.WON);
    } else if (currentNumberOfGuesses >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus(GAME_STATUS.LOST);
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = event.key;
      if (key === "Backspace") {
        handleKeyboardButtonPress("⌫");
      } else if (key === "Enter") {
        handleKeyboardButtonPress("↵");
      } else {
        handleKeyboardButtonPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess, setCurrentGuess, gameStatus]);

  let banner;
  if (gameStatus === GAME_STATUS.WON) {
    banner = (
      <BannerWin
        gameStatus={gameStatus}
        handleResetGame={handleResetGame}
      />
    );
  } else if (gameStatus === GAME_STATUS.LOST) {
    banner = (
      <BannerLose
        gameStatus={gameStatus}
        answer={answer}
        handleResetGame={handleResetGame}
      />
    );
  }

  return (
    <div className={styles.game}>
      <Board guesses={guesses} currentGuess={currentGuess} />
      <div className={styles.bannerContainer}>
        <div className={styles.fadeInBar} />
        {banner}
      </div>
      {/* <EntryField
        enabled={gameStatus !== GAME_STATUS.PLAYING}
        handleSubmitGuess={handleSubmitGuess}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
      /> */}
      <Keyboard
        handleKeyboardButtonPress={handleKeyboardButtonPress}
        lettersStatus={lettersStatus}
      />
    </div>
  );
}

export default Game;
