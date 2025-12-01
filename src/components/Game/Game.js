import React from "react";

import Board from "../Board";
import Keyboard from "../Keyboard";
import BannerWin from "../BannerWin/BannerWin";
import BannerLose from "../BannerLose/BannerLose";
import { LettersStatusContext } from "../ContextProviders/LettersStatusProvider/LettersStatusProvider";

import useKeypress from "../../hooks/useKeypress";
import { checkGuess } from "../../game-helpers";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import {
  GAME_STATUS,
  NUM_OF_GUESSES_ALLOWED,
  WORD_LENGTH,
} from "../../constants";

import styles from "./Game.module.css";

function Game() {
  const [answer, setAnwser] = React.useState(() => sample(WORDS));
  const [guesses, setGuesses] = React.useState([]);
  const [currentGuess, setCurrentGuess] = React.useState("");
  const [gameStatus, setGameStatus] = React.useState(
    GAME_STATUS.PLAYING
  );

  const currentGuessRef = React.useRef(currentGuess);

  const { updateLettersStatus, resetLettersStatus } =
    React.useContext(LettersStatusContext);

  console.info({ answer });

  const handleResetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus(GAME_STATUS.PLAYING);
    setAnwser(sample(WORDS));
    resetLettersStatus();
  };

  const handleSubmitGuess = React.useCallback(() => {
    const guess = currentGuessRef.current;
    if (guess.length !== WORD_LENGTH) {
      return;
    }

    const newGuess = checkGuess(guess, answer);
    updateLettersStatus(newGuess);

    setGuesses((nextGeuesses) => [...nextGeuesses, newGuess]);
    setCurrentGuess("");
  }, []);

  const handleKeyboardButtonPress = React.useCallback(
    (keyInput) => {
      if (gameStatus !== GAME_STATUS.PLAYING) {
        return;
      }

      const key = keyInput.toUpperCase();

      if (key === "⌫") {
        setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
      } else if (key === "↵") {
        handleSubmitGuess();
      } else if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((prevGuess) =>
          prevGuess.length >= WORD_LENGTH
            ? prevGuess
            : prevGuess + key
        );
      }
    },
    [handleSubmitGuess]
  );

  const checkIfGameOver = (totalGuesses) => {
    if (totalGuesses.length === 0) return;

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

  const banner = React.useMemo(() => {
    if (gameStatus === GAME_STATUS.WON) {
      return (
        <BannerWin
          gameStatus={gameStatus}
          handleResetGame={handleResetGame}
        />
      );
    } else if (gameStatus === GAME_STATUS.LOST) {
      return (
        <BannerLose
          gameStatus={gameStatus}
          answer={answer}
          handleResetGame={handleResetGame}
        />
      );
    } else {
      return null;
    }
  }, [gameStatus]);

  useKeypress(handleKeyboardButtonPress);

  React.useEffect(() => {
    currentGuessRef.current = currentGuess;
  }, [currentGuess]);

  React.useEffect(() => {
    checkIfGameOver(guesses);
  }, [guesses]);

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
        // lettersStatus={lettersStatus}
      />
    </div>
  );
}

export default Game;
