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
import moment from "moment";
import {
  userAvatarLogo,
  gptAvatarLogo,
  gptBlueAvatarLogo,
} from "../model/icons";
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
          {/* <Avatar src={avatarIco} name='Zoe' /> */}
          <MessageList
            typingIndicator={
              isLoading ? <TypingIndicator content={"GPT is responding"} /> : ""
            }>
            {chatList.map((msg, i) => {
              const start = moment(msg.sentTime);

              return (
                <Message key={msg.id} model={msg} avatarPosition='cl'>
                  <Message.CustomContent>
                    <Typography
                      style={{
                        fontSize: ".8rem",
                        lineHeight: "1.4em",
                        color: i % 2 ? "white" : "black",
                        fontWeight: i % 2 ? 500 : 400,
                      }}>
                      {msg.message}
                    </Typography>
                  </Message.CustomContent>

                  <Message.Footer
                    sender={msg.sender}
                    sentTime={start.fromNow()}>
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
                        // backgroundColor: "silver",
                        borderRadius: 3,
                        textAlign: "right",
                        fontSize: ".5rem",
                        paddingLeft: 10,
                      }}>
                      {" "}
                      {msg.tokens}Tokens = {msg.price}$
                    </span>
                  </Message.Footer>

                  <Avatar
                    src={i % 2 === 0 ? userAvatarLogo : gptBlueAvatarLogo}
                    name='GPT'
                  />
                </Message>
              );
            })}

            {prompt !== "" ? (
              <Message model={{ direction: "incoming" }}>
                <Message.CustomContent>
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      lineHeight: "1.4em",
                      color: "white",
                      fontWeight: 500,
                    }}>
                    {prompt}
                  </Typography>
                </Message.CustomContent>
                <Avatar src={userAvatarLogo} name='User' />
              </Message>
            ) : (
              ""
            )}
            {stream !== "" ? (
              <Message model={{ direction: "outgoing" }}>
                <Message.CustomContent>
                  <Typography
                    style={{
                      fontSize: ".8rem",
                      lineHeight: "1.4em",
                      color: "white",
                      fontWeight: 500,
                    }}>
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
