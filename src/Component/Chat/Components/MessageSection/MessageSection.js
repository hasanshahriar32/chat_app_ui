import React, { useContext } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Button,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { ChatContext, ChatState } from "../../../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";

const MessageSection = () => {
  const [typing, setTyping] = useState(false);
  const { user, setUser, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  const { selectedChat } = ChatState();
  const [messages, setMessages] = useState([
    {
      message: "Hello! I am devHive. How can I help you with?",
      sender: "hasan",
    },
  ]);
  const handleSend = async (messagesend) => {
    const newMessage = {
      message: messagesend,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    //update our user state
    setMessages(newMessages);

    //set a typing indicator
    setTyping(true);

    //process message and post to the server
  };
  // console.log(selectedChat?.chatName);
  return (
    <div className={selectedChat ? "block" : "hidden lg:block"}>
      <div
        className=" h-[580px] mt-6  md:px-8  bg-transparent "
        style={{ position: "relative" }}
      >
        <button
          onClick={() => setSelectedChat(null)}
          className="absolute block lg:hidden btn btn-outline btn-accent z-10 top-2 left-10"
          direction="left"
        >
          Back
        </button>
        <div
          className="absolute text-3xl font-bold font-mono text-blue-400  z-10 top-2 right-10"
          direction="right"
        >
          {selectedChat?.chatName}
        </div>
        <ConversationHeader
          displayname="dsf"
          className="h-16 "
        ></ConversationHeader>

        <MainContainer>
          <ChatContainer>
            <MessageList
              // scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="hasan is typing" /> : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput onSend={handleSend} placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default MessageSection;
