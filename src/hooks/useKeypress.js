import React from "react";

const useKeypress = (callback) => {
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = event.key;
      if (key === "Backspace") {
        callback("⌫");
      } else if (key === "Enter") {
        callback("↵");
      } else {
        callback(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      console.log("Removing keydown listener");
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback]);
};

export default useKeypress;
