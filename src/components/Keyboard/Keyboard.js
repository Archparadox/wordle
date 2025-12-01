import React from "react";

import styles from "./Keyboard.module.css";
import KeyboardRow from "../KeyboardRow";
import { LettersStatusContext } from "../ContextProviders/LettersStatusProvider/LettersStatusProvider";

function Keyboard({ handleKeyboardButtonPress }) {
  const { lettersStatus } = React.use(LettersStatusContext);

  const row1 = "QWERTYUIOP";
  const row2 = "ASDFGHJKL";
  const row3 = "↵ZXCVBNM⌫";

  const translateRow = (row) => {
    return row.split("").map((letter) => ({ letter, status: null }));
  };

  return (
    <div className={styles.keyboard}>
      <KeyboardRow
        length={row1.length}
        letters={translateRow(row1)}
        handleKeyboardButtonPress={handleKeyboardButtonPress}
        lettersStatus={lettersStatus}
      />
      <KeyboardRow
        length={row2.length}
        letters={translateRow(row2)}
        handleKeyboardButtonPress={handleKeyboardButtonPress}
        lettersStatus={lettersStatus}
      />
      <KeyboardRow
        length={row3.length}
        letters={translateRow(row3)}
        handleKeyboardButtonPress={handleKeyboardButtonPress}
        lettersStatus={lettersStatus}
      />
    </div>
  );
}

export default React.memo(Keyboard);
