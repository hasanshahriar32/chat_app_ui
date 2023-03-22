import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import BIRDS from "vanta/dist/vanta.net.min";
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag
// import "./Chat.css";

const Chat = (props) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const data = await fetch("https://chat-app-server-ten.vercel.app/api/chat");
    const newChats = await data.json();
    setChats(newChats);
  };
  console.log(chats);
  useEffect(() => {
    fetchChats();
  }, []);
  return <div className="chat" ref={myRef}></div>;
};

export default Chat;
