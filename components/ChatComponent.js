import { useContext } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageGroup,
  MessageCustomContent,
  MessageSeparator,
  MessageInput,
  Conversation,
  Avatar,
  Search,
  ConversationList,
  Sidebar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import ChatContext from "../context/ChatContext";
import { Typography } from "./Atoms/Typography";
import { AiOutlineCopy } from "react-icons/ai";
import moment from "moment";
import {
  userAvatarLogo,
  gptAvatarLogo,
  gptBlueAvatarLogo,
} from "../model/icons";
import { Box } from "../components/Atoms/Box";
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const ChatComponent = ({
  handlePromptTextChange,
  handleSendMessage,
  stream,
  prompt,
  handleOnClick,
}) => {
  const { chatHistory, isLoading } = useContext(ChatContext);

  const chatList = [];
  let len = chatHistory.length - 1;
  chatHistory.forEach((h, i) => {
    chatList.push({
      id: h.id,
      message: h.prompt,
      sentTime: h.prompt_timestamp.toLocaleString(),
      direction: "incoming",
      tokens: h.prompt_tokens,
      engine: h.engine,
      price: h.prompt_price,
      sender: "You",
      position: "normal",
    });
    chatList.push({
      id: h.chatId,
      message: h.completion,
      sentTime: h.completion_timestamp.toLocaleString(),
      direction: "outgoing",
      tokens: h.completion_tokens,
      engine: h.engine,
      price: h.completion_price,
      sender: "GPT",
      position: i === len ? "last" : "normal",
    });
  });

  return (
    <div
      style={{ position: "relative", height: "92svh" }}
      onClick={() => handleOnClick()}>
      <MainContainer responsive>
        <Sidebar position='left' scrollable={true} loading={isLoading}>
          <Search placeholder='Search...' />
          <ConversationList>
            <Conversation
              name='GPT Assistant'
              lastSenderName='conversation:'
              info='Chatting'>
              <Avatar
                src={gptAvatarLogo}
                name='GPT Assistant'
                status='available'
              />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <MessageList
            typingIndicator={
              isLoading ? <TypingIndicator content={"GPT is responding"} /> : ""
            }>
            {chatList.map((msg, i) => {
              const start = moment(new Date(msg.sentTime));

              return (
                <Message key={msg.id} model={msg} avatarPosition='cl'>
                  <Message.CustomContent>
                    <Typography
                      fontSize={1}
                      lineHeight={1}
                      color={i % 2 ? "white" : "#333"}
                      fontWeight={i % 2 ? "bold" : "normal"}>
                      {msg.message}
                    </Typography>
                  </Message.CustomContent>

                  <Message.Footer
                    sender={msg.sender}
                    sentTime={start.fromNow()}>
                    <Box width={"100%"} spacing={0}>
                      {i % 2 !== 0 && (
                        <>
                          <span
                            style={{
                              color: "rgba(21,162,127,1)",
                              borderRadius: 3,
                              fontSize: ".5rem",
                            }}>
                            {start.fromNow()}
                          </span>
                          <span
                            style={{
                              color: "orange",
                              borderRadius: 3,
                              textAlign: "right",
                              fontSize: ".5rem",
                              paddingLeft: 10,
                            }}>
                            {"By"} {msg.engine}
                          </span>
                        </>
                      )}
                      <span
                        style={{
                          color: "rosybrown",
                          borderRadius: 3,
                          textAlign: "right",
                          fontSize: ".5rem",
                          paddingLeft: 10,
                        }}>
                        {msg.tokens}Tokens = {msg.price}$
                      </span>
                      <span
                        style={{
                          marginTop: -2,
                          marginLeft: 3,
                          backgroundColor: "lightskyblue",
                          padding: "2px 2px 1px 1px",
                          borderRadius: 4,
                          width: 15,
                          height: 15,
                        }}
                        onClick={() => copyToClipboard(msg.message)}>
                        <span
                          style={{
                            marginTop: -1,
                            marginLeft: 1,
                          }}>
                          <AiOutlineCopy
                            size={11}
                            color={"white"}></AiOutlineCopy>
                        </span>
                      </span>
                    </Box>
                  </Message.Footer>

                  <Avatar
                    src={i % 2 === 0 ? userAvatarLogo : gptBlueAvatarLogo}
                    name='GPT'
                  />
                </Message>
              );
            })}

            {prompt !== "" && stream !== "" ? (
              <Message model={{ direction: "incoming" }}>
                <Message.CustomContent>
                  <Typography>{prompt}</Typography>
                </Message.CustomContent>
                <Avatar src={userAvatarLogo} name='User' />
              </Message>
            ) : (
              ""
            )}
            {stream !== "" ? (
              <Message model={{ direction: "outgoing" }}>
                <Message.CustomContent>
                  <Typography color={"white"} fontWeight={"bold"}>
                    {stream}
                  </Typography>
                </Message.CustomContent>
              </Message>
            ) : (
              ""
            )}
          </MessageList>
          <MessageInput
            placeholder="What's on your mind?"
            // value={messageInputValue}
            onChange={(val) => handlePromptTextChange(val)}
            onSend={(val) => handleSendMessage(val)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
export default ChatComponent;
