import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(newMode, replace = false) { //set the new view as the mode
    setMode(newMode);

    if (replace) {
      history.pop();
      setHistory((prev) => [...prev, newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }
    // console.log(mode)
  function back() { //to go back, if history array more then 1
    if (history.length >  1) { //remove the last one
      history.pop(); 
      setMode(history[history.length - 1]); //set the new mode to whatever the histry was  minus one
    }
  }

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}
