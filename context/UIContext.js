import { createContext, useState } from "react";
const UIContext = createContext({});
export function UIContextProvider({ children }) {
  const [asideExpanded, setAsideExpanded] = useState(false);
  //const [asideExpanded, setAsideExpanded] = useState(false);
  const setAsideExpand = () => {
    if (asideExpanded) setAsideExpanded(false);
    else setAsideExpanded(true);
  };

  return (
    <UIContext.Provider value={{ asideExpanded, setAsideExpand }}>
      {children}
    </UIContext.Provider>
  );
}
export default UIContext;
