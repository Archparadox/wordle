import React from "react";

import Banner from "../Banner";
import { GAME_STATUS } from "../../constants";

import styles from "./BannerLose.module.css";

function BannerLose({ gameStatus, answer, handleResetGame }) {
  const isGameOver = gameStatus !== GAME_STATUS.PLAYING;

  return (
    <Banner gameStatus={gameStatus}>
      <p className={styles.message}>
        Game Over
        <br />
        the word was <b>{answer}</b>
      </p>
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

export default BannerLose;
