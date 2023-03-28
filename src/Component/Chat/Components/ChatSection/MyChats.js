import {
  Box,
  Container,
  Divider,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getSender } from "../../../../Config/ChatLogics";
import { ChatContext } from "../../../../Context/ChatProvider";

const MyChats = () => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
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

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <Container
      maxW="md"
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p={3}
      _light={{
        //   bg: "gray.100",
        color: "gray.100",
      }}
      // _dark={{
      //   bg: "gray.800",
      // }}
      // bg="transparent"
      // bgOpacity={0.5}
      // w={{ base: "100%", md: "31%" }}
      w="100%"
      borderColor="whiteAlpha.400"
      m="5"
      className=" absolute z-20 max-h-fit m-6"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="whiteAlpha.200"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack h="lg" overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "gray.800"}
                // color={selectedChat === chat ? "white" : "blackAlpha.100"}
                px={3}
                py={2}
                _hover={{ bg: "cyan.900" }}
                borderRadius="lg"
                key={chat?.id}
              >
                <Text>
                  {!chat?.isGroupChat
                    ? getSender(loggedUser, chat?.users)
                    : chat?.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          "loading"
        )}
      </Box>
    </Container>
  );
};

export default MyChats;
