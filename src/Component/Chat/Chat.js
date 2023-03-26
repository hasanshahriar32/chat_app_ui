import { Box, Container, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BIRDS from "vanta/dist/vanta.birds.min";
import { ChatContext } from "../../Context/ChatProvider";
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag
import "./Chat.css";

const Chat = (props) => {
  let location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(null);
  const { user, setUser } = useContext(ChatContext);
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

  if (!user) {
    navigate("/login");
  }

  console.log(user);
  return <div className="chat" ref={myRef}></div>;
};

export default Chat;
