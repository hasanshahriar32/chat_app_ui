import { Box, Container, Divider, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BIRDS from "vanta/dist/vanta.birds.min";
import { ChatContext } from "../../Context/ChatProvider";
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag
import "./Chat.css";
import ChatList from "./Components/ChatSection/ChatList";
import MessageSection from "./Components/MessageSection";

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

  // console.log(user);
  return (
    <div className="chat " ref={myRef}>
      {user && (
        <div className="grid grid-flow-row-dense  w-[100vw] grid-cols-2 lg:grid-cols-12 grid-rows-1 ">
          <div className="col-span-5 ">
            <ChatList></ChatList>
          </div>
          <div className="col-span-7   lg:block hidden">
            <MessageSection></MessageSection>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
