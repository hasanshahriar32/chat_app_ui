import React, { useContext, useEffect } from "react";
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
import { GiReturnArrow } from "react-icons/gi";
import { ChatContext, ChatState } from "../../../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import ScrollToTopButton from "./ScrollToTopButton";
import { getSenderFull, getSenderName } from "../../../../Config/ChatLogics";
import ProfileModal from "./ProfileModal";
import GroupModal from "./GroupModal";

const MessageSection = () => {
  const [typing, setTyping] = useState(false);
  const { user, setUser, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  const { selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const handleSend = async (messagesend) => {
    const newMessage = {
      message: messagesend,
      sender: user?.name,
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    //update our user state
    setMessages(newMessages);

    //set a typing indicator
    setTyping(true);

    //process message and post to the server
  };

  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(selectedChat?.chatName);
  return (
    <div className={selectedChat ? "block" : "hidden lg:block"}>
      <div
        className="absolute  mt-0 lg: overflow-scroll lg:mt-6  md:px-8  bg-transparent "
        // style={{ position: "relative" }}
        style={{ height: `${height}px`, position: "relative" }}
      >
        <button
          onClick={() => setSelectedChat(null)}
          className="absolute block lg:hidden btn btn-sm btn-primary z-10 top-4 left-10"
          direction="left"
        >
          <GiReturnArrow></GiReturnArrow>
        </button>
        {selectedChat && (
          <div
            className="absolute mr-20 h-9 overflow-clip text-2xl font-semibold font-mono text-blue-400  z-10 top-4 lg:left-10 left-24"
            direction="right"
          >
            {!selectedChat?.isGroupChat ? (
              <> {getSenderName(user, selectedChat?.users)} </>
            ) : (
              <> {selectedChat?.chatName} </>
            )}
          </div>
        )}

        {selectedChat?.isGroupChat === false && (
          <ProfileModal
            current={getSenderFull(user, selectedChat?.users)}
          ></ProfileModal>
        )}
        {selectedChat?.isGroupChat === true && (
          <GroupModal current={selectedChat}></GroupModal>
        )}

        <ConversationHeader
          displayname="dsf"
          className="h-16 "
        ></ConversationHeader>

        <MainContainer className="flex flex-col">
          <ChatContainer>
            <MessageList
              className="mb-20"
              // scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="hasan is typing" /> : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              className="fixed bottom-20"
              onSend={handleSend}
              placeholder="Type message here"
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default MessageSection;
