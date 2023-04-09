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
              isLoading ? (
                <TypingIndicator
                  // style={{
                  //   height: 100,
                  //   width: "400px",
                  //   position: "absolute",
                  //   whiteSpace: "pre-wrap",
                  // }}
                  content={stream}
                />
              ) : (
                ""
              )
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
                  {/* <ReactMarkdown> */}
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
            placeholder="What's in your mind?"
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
