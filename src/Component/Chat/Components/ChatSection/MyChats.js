import {
  Box,
  Container,
  Divider,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
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
  const [loading, setLoading] = useState(false);
  const fetchChats = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
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
      className=" absolute z-10 max-h-fit m-6"
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
        {!loading ? (
          <Stack h="lg" overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "gray.800"}
                // color={selectedChat === chat ? "white" : "blackAlpha.100"}
                px={3}
                py={2}
                _light={{
                  //   bg: "gray.100",
                  color: "gray.100",
                }}
                _dark={{
                  // bg: "gray.800",
                  color: "gray.300",
                }}
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
          <Stack h="lg">
            <SkeletonCircle
              startColor="pink.500"
              endColor="orange.500"
              size="10"
            />
            <SkeletonText
              mt="4"
              noOfLines={10}
              rounded="lg"
              spacing="4"
              skeletonHeight="8"
            />
            {/* <Skeleton noOfLines={4} rounded="lg" height="50px" />
            <Skeleton rounded="lg" height="50px" />
            <Skeleton rounded="lg" height="50px" /> */}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default MyChats;
