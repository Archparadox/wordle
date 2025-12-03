import React from "react";

import Cell from "../Cell";
import { range } from "../../utils";
import { WORD_LENGTH } from "../../constants";

import styles from "./Row.module.css";

const rowLettersAreEqualComparator = (prevProps, nextProps) => {
  const prev = prevProps.letters;
  const next = nextProps.letters;
  if (!prev && !next) return true;
  if (!prev || !next) return false;
  if (prev.length !== next.length) return false;
  for (let i = 0; i < prev.length; i++) {
    const p = prev[i];
    const n = next[i];
    if (!p && !n) continue;
    if (!p || !n) return false;
    if (p.letter !== n.letter || p.status !== n.status) return false;
  }
  return true;
};

const Row = ({ length = WORD_LENGTH, letters }) => {
  return (
    <div className={styles.row}>
      {range(length).map((_, index) => {
        return (
          <Cell
            key={index}
            letter={letters?.[index]?.letter}
            status={letters?.[index]?.status}
          />
        );
      })}
    </div>
  );
};

export default React.memo(Row, rowLettersAreEqualComparator);
