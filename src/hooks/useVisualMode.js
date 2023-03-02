import { useState } from "react";

export default function useVisualMode(initial) {
  //Unique hook to transition between modes and display boxes on render
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      const copyHistory = history.slice(0, history.length - 1);
      setHistory([...copyHistory, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
  };

  return { mode, transition, back };
}
