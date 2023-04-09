import { createContext, useState } from "react";
import { AISettings } from "../model/model";

const AIContext = createContext({});

export function AIProvider({ children }) {
  const [AIstate, setState] = useState({ ...AISettings });

  const setAIState = (s) => {
    setState((prevState) => {
      return { ...prevState, ...s };
    });
  };

  return (
    <AIContext.Provider value={{ AIstate, setAIState }}>
      {children}
    </AIContext.Provider>
  );
}

export default AIContext;
