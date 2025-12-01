import React from "react";

import styles from "./CellClickable.module.css";
import Cell from "../Cell";
import { LettersStatusContext } from "../ContextProviders/LettersStatusProvider/LettersStatusProvider";

function CellClickable({
  letter,
  status,
  handleKeyboardButtonPress,
}) {
  const length = "clamp(15px, 7vw, 39px)";
  const dimensions = { width: length, height: length };
  if (!/[a-zA-Z]/.test(letter))
    dimensions.width = "clamp(27px, 10.5vw, 61px)";

  const { lettersStatus } = React.useContext(LettersStatusContext);

  return (
    <button
      onClick={() => handleKeyboardButtonPress(letter)}
      className={styles.cellClickable}
    >
      <Cell
        letter={letter}
        status={lettersStatus?.[letter]?.status}
        dimensions={dimensions}
      />
    </button>
  );
}

export default CellClickable;
