import React from "react";

import styles from "./EntryField.module.css";
import { isLetter } from "../../utils";

function EntryField({
  handleSubmitGuess,
  currentGuess,
  setCurrentGuess,
  enabled,
}) {
  const inputRef = React.useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitGuess();
  };

  return (
    <form
      tabIndex={0}
      className={styles.inputForm}
      onSubmit={handleSubmit}
    >
      <label>Enter guess:</label>
      <input
        ref={inputRef}
        autoFocus
        disabled={!enabled}
        className={styles.textInput}
        type="text"
        maxLength="5"
        value={currentGuess}
        // onChange={(event) => handleInputChange(event.nativeEvent.data)}
      />
    </form>
  );
}

export default EntryField;
