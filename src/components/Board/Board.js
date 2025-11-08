import React from "react";

import Row from "../Row/Row";
import { range } from "../../utils";
import {
  LETTER_STATUS,
  NUM_OF_GUESSES_ALLOWED as NUM_ROWS,
} from "../../constants";

import styles from "./Board.module.css";

function Board({ guesses, currentGuess }) {
  const activeGuess = currentGuess?.split("").map((letter) => ({
    letter,
    status: LETTER_STATUS.UNUSED,
  }));

  return (
    <div className={styles.board}>
      {range(NUM_ROWS).map((num, index) => (
        <Row key={num} letters={[...guesses, activeGuess]?.[index]} />
      ))}
    </div>
  );
}

export default Board;
