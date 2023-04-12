// "use client";
import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const ChatContext = createContext({});

export function ChatProvider({ children }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToHistory = (messageItem) => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      {
        id: uuidv4(),
        ...messageItem,
      },
    ]);
    //console.log(chatHistory);
  };

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        addToHistory,
        isLoading,
        setIsLoading,
        clearChatHistory,
      }}>
      {children}
    </ChatContext.Provider>
  );
}
export default ChatContext;
