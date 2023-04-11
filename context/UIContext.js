import { createContext, useState } from "react";
const UIContext = createContext({});
export function UIContextProvider({ children }) {
  const [asideExpanded, setAsideExpanded] = useState(false);
  //const [asideExpanded, setAsideExpanded] = useState(false);
  const setAsideExpand = (status = true) => {
    if (asideExpanded && status) setAsideExpanded(false);
    else if (asideExpanded === false && status) setAsideExpanded(true);
    else setAsideExpanded(true);
  };

  return (
    <UIContext.Provider value={{ asideExpanded, setAsideExpand }}>
      {children}
    </UIContext.Provider>
  );
}
export default UIContext;
