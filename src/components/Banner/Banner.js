import React from "react";

import styles from "./Banner.module.css";
import { GAME_STATUS } from "../../constants";

function Banner({ children, gameStatus }) {
  let statusStyles;
  if (gameStatus === GAME_STATUS.WON) {
    statusStyles = styles.winner;
  } else if (gameStatus === GAME_STATUS.LOST) {
    statusStyles = styles.loser;
  }

  return (
    <div className={styles.bannerWrapper}>
      <div className={`${styles.banner} ${statusStyles}`}>
        {children}
      </div>
    </div>
  );
}

export default Banner;
