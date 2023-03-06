// import { useState } from "react";

// export default function useVisualMode(initial) {
//   //Unique hook to transition between modes and display boxes on render
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   const transition = (newMode, replace = false) => {
//     if (replace) {
//       const copyHistory = history.slice(0, history.length - 1);
//       setHistory([...copyHistory, newMode]);
//     } else {
//       setHistory([...history, newMode]);
//     }
//     setMode(newMode);
//   };

//   const back = () => {
//     if (history.length > 1) {
//       setMode(history[history.length - 2]);
//       setHistory(history.slice(0, history.length - 1));
//     }
//   };

//   return { mode, transition, back, history };
// }



// // const transition = (newMode, replace = false) => {
// //   // const copyHistory = history.slice(0, history.length - 1);
// //   setHistory((prev) => {
// //     if (replace) {
// //       console.log("prev in replace", prev)
// //       const copyHistoryTwo = prev.slice(0, prev.length - 1);
// //       console.log("copyHistoryTwo", copyHistoryTwo);
// //       return [...copyHistoryTwo, newMode];
// //     } else {
// //       return [...prev, newMode];
// //     }
// //   });
// //   // console.log("copyHistory", copyHistory)
// //   // setHistory([...copyHistory, newMode]);

// //   setMode(newMode);
// //   console.log("history is:",history, newMode)
// // };

// // const back = () => {
// //   if (history.length > 1) {
// //     setHistory((prev) => {
// //       console.log("prev in sethistory", prev);
// //       const newHistory = [...prev.slice(0, history.length - 1)]
// //       console.log("newHistory", newHistory)
// //       const newMode = newHistory[newHistory.length - 2]
// //       console.log("newMode", newMode)
// //       setMode(newMode);
// //       return [...newHistory, newMode];
// //     });
// //     console.log("ln 32", history);
// //   }
// // };

import { useState } from "react";

const useVisualMode = initialMode => {
  const [history, setHistory] = useState([initialMode]);

  const transition = (mode, replace = false) => {
    setHistory(prev =>
      replace ? [...prev.slice(0, -1), mode] : [...prev, mode]
    );
  };

  const back = () => {
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode; 