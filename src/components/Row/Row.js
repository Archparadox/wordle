import React from "react";

import Cell from "../Cell";
import { range } from "../../utils";
import { WORD_LENGTH } from "../../constants";

import styles from "./Row.module.css";

function Row({ length = WORD_LENGTH, letters}) {
  // console.log("Row letters:", letters);

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
}

export default Row;
