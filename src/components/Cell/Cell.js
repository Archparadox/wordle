import React from "react";

import styles from "./Cell.module.css";
import { LETTER_COLORS } from "../../constants";

function Cell({ letter, status, dimensions }) {
  const color = LETTER_COLORS[status];
  const { width, height } = dimensions || {};

  return (
    <div
      className={styles.cell}
      style={{ "--color": color, width, height }}
    >
      <p className={styles.letter}>{letter}</p>
    </div>
  );
}

export default Cell;
