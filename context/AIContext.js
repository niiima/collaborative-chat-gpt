import { createContext, useState } from "react";
import { AISettings } from "../model/model";

const AIContext = createContext({});

export function AIProvider({ children }) {
  const [AIstate, setState] = useState({ ...AISettings });
  const [activeRoute, setActiveRoute] = useState(0);

  const setAIState = (s) => {
    setState((prevState) => {
      return { ...prevState, ...s };
    });
  };

  return (
    <AIContext.Provider
      value={{ AIstate, setAIState, activeRoute, setActiveRoute }}>
      {children}
    </AIContext.Provider>
  );
}

export default AIContext;
