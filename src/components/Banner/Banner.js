import React from "react";

import styles from "./Banner.module.css";

function Banner({ isGameOver, isWinner, answer, handleResetGame }) {
  const winMessage = <p>Winner!</p>;
  const loseMessage = (
    <p className={styles.message}>
      Game Over
      <br />
      the word was <span className={styles.answer}>{answer}</span>
    </p>
  );
  const message = isWinner ? winMessage : loseMessage;

  return (
    <div className={styles.bannerWrapper}>
      {
        <div
          className={`${styles.banner} ${
            isWinner ? styles.winner : styles.loser
          } ${isGameOver ? styles.slideIn : styles.slideOut}`}
        >
          {message}
          <button
            className={`${styles.playAgainButton} ${
              isGameOver ? styles.appear : ""
            }`}
            onClick={handleResetGame}
            disabled={!isGameOver}
          >
            Play Again ?
          </button>
        </div>
      }
    </div>
  );
}

export default Banner;
