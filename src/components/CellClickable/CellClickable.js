import React from "react";

import styles from "./CellClickable.module.css";
import Cell from "../Cell";

function CellClickable({
  letter,
  status,
  handleKeyboardButtonPress,
}) {

  const length = "clamp(15px, 7vw, 39px)";
  const dimensions = { width: length, height: length };
  if(!/[a-zA-Z]/.test(letter)) dimensions.width = "clamp(27px, 10.5vw, 61px)";

  return (
    <button
      onClick={() => handleKeyboardButtonPress(letter)}
      className={styles.cellClickable}
    >
      <Cell letter={letter} status={status} dimensions={dimensions}/>
    </button>
  );
}

export default CellClickable;
