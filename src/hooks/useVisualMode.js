import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);

  //Sets history state to an array with the param value
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      return setMode(mode);
    }
    setMode(mode);
    //adds param to end off history array
    setHistory((prev) => [...prev, mode]);
  };

  //Removes last element of history array and sets mode to new last element, if only one element in array set mode to remaining element
  const back = () => {
    if (history.length === 1) {
      return setMode(history[0]);
    }

    let newHistory = [...history];

    newHistory.pop();
    let index = newHistory.length - 1;

    setMode(newHistory[index]);
  };

  return { mode, transition, back };
};

export default useVisualMode;
