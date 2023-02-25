import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode) => {
    history.push(newMode);
    setMode(newMode)
  }

  const back = () => {
    
    if(history.length > 1) {
    const copyHistory = history;
    setMode(history[history.length-2]);
    copyHistory.pop();
    setHistory(copyHistory);
    }
  }

  return (
    {mode, transition, back}
  )
}


const {first, second} = useVisualMode

// (prev) => {[...prev]}