import React from "react";
import { setUpLettersInitial } from "../../../utils";
import { LETTERS } from "../../../constants";
import { mergeLettersStatus } from "../../../game-helpers";

export const LettersStatusContext = React.createContext();

const LettersStatusProvider = ({ children }) => {
  const [lettersStatus, setLettersStatus] = React.useState(
    setUpLettersInitial(LETTERS)
  );

  const updateLettersStatus = (checkedGuess) => {
    const mergedLettersStatus = mergeLettersStatus(
      checkedGuess,
      lettersStatus
    );

    setLettersStatus(mergedLettersStatus);
  };

  const resetLettersStatus = () => {
    setLettersStatus(setUpLettersInitial(LETTERS));
  };

  return (
    <LettersStatusContext
      value={{
        lettersStatus,
        updateLettersStatus,
        resetLettersStatus,
      }}
    >
      {children}
    </LettersStatusContext>
  );
};

export default LettersStatusProvider;
