import { createContext, useState } from "react";
const UIContext = createContext({});
export function UIContextProvider({ children }) {
  const [asideExpanded, setAsideExpanded] = useState(false);
  const [isPageInLoadingState, setIsPageInLoadingState] = useState(false);
  const setAsideExpand = (status = true) => {
    if (asideExpanded && status) setAsideExpanded(false);
    else if (asideExpanded === false && status) setAsideExpanded(true);
    else setAsideExpanded(false);
  };

  return (
    <UIContext.Provider
      value={{
        asideExpanded,
        setAsideExpand,
        isPageInLoadingState,
        setIsPageInLoadingState,
      }}>
      {children}
    </UIContext.Provider>
  );
}
export default UIContext;
