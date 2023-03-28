import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { TiGroupOutline } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { MdPersonSearch } from "react-icons/md";
import { ChatContext } from "../../../../Context/ChatProvider";
import axios from "axios";
import MyChats from "./MyChats";
const ChatList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconSearch = MdPersonSearch;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setUser, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  const toast = useToast();
  const handleSearch = async () => {
    setLoading(true);
    if (searchResultOpen) {
      setSearch("");
      setLoading(false);
    }

    if (!search) {
      toast({
        description: "please enter something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        // position: "top-right",
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://chat-app-server-ten.vercel.app/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
      // console.log(data);
      setSearchResultOpen(!searchResultOpen);

      if (!searchResultOpen && data.length === 0) {
        toast({
          title: "User not found.",
          description: "check the email address properly!",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to fetch search search result!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "https://chat-app-server-ten.vercel.app/api/chat",
        { userId },
        config
      );
      // if (!chats.find((c) => c._id === data._id)) {
      //   setChats([data, ...chats]);
      // }
      console.log(chats);
      setSelectedChat(data);
      setLoadingChat(false);
      setSearchResultOpen(!searchResultOpen);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to create chat!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoadingChat(false);
    }
  };
  return (
    <div>
      <>
        <div className="flex justify-evenly items-center gap-2 m-2">
          <Box cursor="pointer" className="w-[80%]">
            <InputGroup title="search user to chat">
              <Input
                className="hover:bg-primary-content"
                type="email"
                id="username"
                _light={{
                  bg: "gray.100",
                }}
                _dark={{
                  bg: "gray.800",
                }}
                _hover={{
                  borderBlockColor: "gray.300",
                }}
                placeholder={"search user with email"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  onClick={handleSearch}
                  className="mr-1"
                  size="sm"
                >
                  {searchResult && searchResultOpen ? "CLOSE" : "SEARCH"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Button
            title="create a group chat"
            leftIcon={<TiGroupOutline />}
            colorScheme="teal"
            onClick={onOpen}
          ></Button>

          {
            //create dropdown list of users from search result

            searchResult && searchResultOpen && (
              <Container h="20vh" className="absolute top-14 h-2/3 z-10  w-1/2">
                {(loading || loadingChat) && (
                  <div className="flex gap-2 items-center">
                    <span>loading</span> <Spinner size="sm" d="flex"></Spinner>
                  </div>
                )}
                {searchResult.map((user) => (
                  <Box
                    onClick={() => accessChat(user?._id)}
                    gap={2}
                    _light={{
                      bg: "gray.100",
                    }}
                    _dark={{
                      bg: "gray.800",
                    }}
                    className="flex items-center mt-1 rounded-lg gap-2 p-2"
                  >
                    <Avatar size="md" name={user.name} src={user.pic} />{" "}
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                    </div>
                    {/* <Divider></Divider> */}
                  </Box>
                ))}
              </Container>
            )
          }
        </div>
        <Drawer
          isOpen={isOpen}
          placement="right"
          //   initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Create a new group chat
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="groupname">Group Name</FormLabel>
                  <Input id="groupname" placeholder="Please enter group name" />
                </Box>
                <Box>
                  <FormLabel htmlFor="username">Member</FormLabel>
                  <Input
                    id="member"
                    placeholder="Please enter user name or email"
                  />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
      <MyChats></MyChats>
    </div>
  );
};

export default ChatList;
