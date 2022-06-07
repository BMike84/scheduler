import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //used to tranisition to the next appropriate page
  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
    } else {
      setHistory([...history, mode]);
      setMode(mode);
    }
  };

  //used to go back to previous state when clicking cancel buttons
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory([...history]);
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}
