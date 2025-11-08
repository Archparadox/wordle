import React from "react";

import { range } from "../../utils";
import { WORD_LENGTH } from "../../constants";

import styles from "./KeyboardRow.module.css";
import CellClickable from "../CellClickable";

function KeyboardRow({
  length = WORD_LENGTH,
  letters,
  handleKeyboardButtonPress,
  lettersStatus,
}) {
  // console.log("Row letters:", letters);

  return (
    <div className={styles.row}>
      {range(length).map((_, index) => {
        const L = letters[index].letter;

        return (
          <CellClickable
            key={index}
            letter={letters[index].letter}
            status={lettersStatus[L]?.status}
            handleKeyboardButtonPress={handleKeyboardButtonPress}
          />
        );
      })}
    </div>
  );
}

export default KeyboardRow;
