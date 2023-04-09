import { createContext, useState } from "react";
import { AISettings } from "../model/model";
//import { experimentalEngines as engines } from "../model/model.js";

const AIContext = createContext({});

export function AIProvider({ children }) {
  const [AIstate, setState] = useState({ ...AISettings });
  //   const [activeEngine, setActiveEngine] = useState({
  //     ...engines.find((n) => n.key === AIstate.engine), //[0],
  //   });

  console.log(AIstate);
  const setAIState = (s) => {
    // if (Object.keys(s).includes("engine"))
    //   setActiveEngine({
    //     ...engines.find((n) => n.key === s.engine), //[0],
    //   });
    setState((prevState) => {
      return { ...prevState, ...s };
    });
    //console.log(AIstate);
  };

  return (
    <AIContext.Provider value={{ AIstate, setAIState }}>
      {children}
    </AIContext.Provider>
  );
}
export default AIContext;
