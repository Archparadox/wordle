import React from "react";

import Banner from "../Banner";
import Board from "../Board";
import EntryField from "../EntryField";
import Keyboard from "../Keyboard";

import { sample, setUpLettersInitial } from "../../utils";
import { WORDS } from "../../data";

import styles from "./Game.module.css";
import { checkGuess } from "../../game-helpers";
import { check } from "prettier";
import { LETTER_STATUS, LETTERS } from "../../constants";

// Pick a random word on every pageload.
function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [currentGuess, setCurrentGuess] = React.useState("");
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isWinner, setIsWinner] = React.useState(false);
  const [answer, setAnwser] = React.useState(sample(WORDS));
  const [lettersStatus, setLettersStatus] = React.useState(
    setUpLettersInitial(LETTERS)
  );

  console.info({ answer });

  const handleResetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setIsGameOver(false);
    setIsWinner(false);
    setAnwser(sample(WORDS));
    setLettersStatus(setUpLettersInitial(LETTERS));
  };

  const handleKeyboardButtonPress = (keyInput) => {
    if (isGameOver) {
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
    setGuesses([...guesses, newGuess]);
    setCurrentGuess("");
    checkIfGameOver(currentGuess);
  };

  const checkIfGameOver = (guess) => {
    if (guess === answer || guesses.length > 4) {
      setIsGameOver(true);

      checkIfWinner(guess);
    }
  };

  const checkIfWinner = (guess) => {
    if (guess === answer) {
      setIsWinner(true);
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
  }, [currentGuess, setCurrentGuess, isGameOver]);

  return (
    <div className={styles.game}>
      <Board guesses={guesses} currentGuess={currentGuess} />
      <Banner
        isGameOver={isGameOver}
        isWinner={isWinner}
        answer={answer}
        handleResetGame={handleResetGame}
      />
      {/* <EntryField
        enabled={!isGameOver}
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
