import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ChatContext } from "../../../../Context/ChatProvider";

const MyChats = () => {
  const { user, setUser, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://chat-app-server-ten.vercel.app/api/chat",
        config
      );
      setChats(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occurred.",
        description: "Failed to load the chats!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return <div className=" absolute z-500"></div>;
};

export default MyChats;
