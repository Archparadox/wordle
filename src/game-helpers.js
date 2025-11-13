import { LETTER_STATUS } from "./constants.js";

/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */

export function checkGuessDefault(guess, answer) {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = "✓";

  if (!guess) {
    return null;
  }

  const guessChars = guess.toUpperCase().split("");
  const answerChars = answer.split("");

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: LETTER_STATUS.CORRECT,
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = LETTER_STATUS.ABSENT;
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );

    console.log(
      "misplacedIndex " + guessChars[i] + " - ",
      misplacedIndex
    );
    if (misplacedIndex >= 0) {
      status = LETTER_STATUS.PRESENT;
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

export const checkGuess = (guess, answer) => {
  const chars = guess.toUpperCase().split("");

  const result = chars.map((char, index) => {
    if (answer[index] === char) {
      // correct
      return { letter: char, status: LETTER_STATUS.CORRECT };
    } else if (answer.includes(guess[index])) {
      // present
      return { letter: char, status: LETTER_STATUS.PRESENT };
    } else {
      // absent
      return { letter: char, status: LETTER_STATUS.ABSENT };
    }
  });

  return result;
};
