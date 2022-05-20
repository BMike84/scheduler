import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
    } else {
      setHistory(prev => [...history, mode])
      setMode(mode)
    }
  }

  const back = () => {
    if (history.length >1) {
      history.pop()
      setHistory(history)
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back }
}