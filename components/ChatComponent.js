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
import { useEffect } from "react";
// import ReactMarkdown from "react-markdown";
//import Moment from "react-moment";
const avatarIco =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=";
const gptLogoWithRing =
  "data:image/png;base64,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";

const ChatComponent = ({
  handlePromptTextChange,
  handleSendMessage,
  stream,
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
      //tokens: h.prompt_tokens,
      engine: h.engine,
      //price: h.prompt_price,
      sender: "You",
      position: "normal",
    });
    chatList.push({
      id: h.chatId, //uuidv4(),
      message: h.completion,
      sentTime: h.completion_timestamp.toLocaleString(),
      direction: "outgoing",
      //tokens: h.completion_tokens,
      engine: h.engine,
      //price: h.completion_price,
      sender: "GPT",
      position: i === len ? "last" : "normal",
    });
  });

  useEffect(() => {}, [stream]);

  return (
    <div style={{ position: "relative", height: "90svh" }}>
      <MainContainer responsive>
        <Sidebar position='left' scrollable={true} loading={isLoading}>
          <Search placeholder='Search...' />
          <ConversationList>
            <Conversation name='Psy' lastSenderName='Bi' info='Community'>
              <Avatar src={avatarIco} name='Lilly' status='available' />
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
                    sender={msg.engine}
                    sentTime={start.fromNow()}>
                    {i % 2 !== 0 && (
                      <span
                        style={{
                          color: "AppWorkspace",
                          backgroundColor: "silver",
                          borderRadius: 3,
                          fontSize: ".5rem",
                        }}>
                        {start.fromNow()}
                        {"  by "}
                        {msg.engine}
                      </span>
                    )}
                    <span
                      style={{
                        color: "rosybrown",
                        backgroundColor: "silver",
                        borderRadius: 3,
                        textAlign: "right",
                        fontSize: ".5rem",
                        // marginLeft: 100,
                      }}>
                      {msg.tokens}T = {msg.price}$
                    </span>
                  </Message.Footer>

                  <Avatar
                    src={i % 2 === 0 ? avatarIco : gptLogoWithRing}
                    name='GPT'
                  />
                </Message>
              );
            })}

            {stream !== "" ? (
              <Message>
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
