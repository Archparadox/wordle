import React from "react";

import Row from "../Row/Row";
import { range } from "../../utils";
import {
  LETTER_STATUS,
  NUM_OF_GUESSES_ALLOWED as NUM_ROWS,
} from "../../constants";

import styles from "./Board.module.css";

function Board({ guesses, currentGuess }) {

  console.log("Board render", { guesses, currentGuess });
  const activeGuess = currentGuess?.split("").map((letter) => ({
    letter,
    status: LETTER_STATUS.UNUSED,
  }));
  console.log("activeGuess", { activeGuess });  

  return (
    <div className={styles.board}>
      {range(NUM_ROWS).map((num) => {
        let letters = [];

        if (num < guesses.length) {
          letters = guesses[num];
        } else if (num === guesses.length) {
          letters = activeGuess;
        }

        return (
          <Row
            key={num}
            letters={letters}
          />
        );
      })}
    </div>
  );
}

export default Board;
