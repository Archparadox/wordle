import React from "react";

import Banner from "../Banner";
import { GAME_STATUS } from "../../constants";

import styles from "./BannerWin.module.css";

function BannerWin({ gameStatus, handleResetGame }) {
  const isGameOver = gameStatus !== GAME_STATUS.PLAYING;

  return (
    <Banner gameStatus={gameStatus}>
      <p>Winner!</p>
      <button
        className={`${styles.playAgainButton} ${
          isGameOver ? styles.appear : ""
        }`}
        onClick={handleResetGame}
        disabled={!isGameOver}
      >
        Play Again ?
      </button>
    </Banner>
  );
}

export default BannerWin;
