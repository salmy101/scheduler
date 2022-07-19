import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) { 
    setMode(newMode);

    if (replace) {
      const clonedHistory = [...history]
      clonedHistory.pop();
      setHistory(() => [...clonedHistory, newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }
  function back() { 
    if (history.length >  1) { 
      const clonedHistory = [...history]
      clonedHistory.pop(); 
      setHistory(() => [...clonedHistory])
      setMode(history[history.length - 1]); 
    }
  }

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}
