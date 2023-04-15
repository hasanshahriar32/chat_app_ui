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
  FormControl,
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
import { ChatContext, ChatState } from "../../../../Context/ChatProvider";
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
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchGroupMember, setSearchGroupMember] = useState("");
  const [groupSearchResult, setGroupSearchResult] = useState([]);
  const [groupLoading, setGroupLoading] = useState(false);

  const { user, setUser, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  const toast = useToast();
  const handleSearch = async () => {
    // setLoading(true);
    if (searchResultOpen) {
      setSearch("");
      setLoading(false);
    }

    if (!search) {
      setSearch("");
      toast({
        description: "please enter something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        // position: "top-right",
      });
      setSearchResultOpen(false);

      return;
    }
    setLoading(true);

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
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      console.log(chats);
      setSelectedChat(data);
      setLoadingChat(false);
      setSearchResultOpen(!searchResultOpen);
      console.log(data);
      setSearch("");
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

  const handleGroupSearch = async (query) => {
    setSearchGroupMember(query);
    if (!query) {
      setSearchGroupMember([]);
      return;
    }
    try {
      setGroupLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `https://chat-app-server-ten.vercel.app/api/user?search=${searchGroupMember}`,
        config
      );
      setGroupLoading(false);
      setGroupSearchResult(data);
      console.log(data);
    } catch (error) {
      toast({
        description: "Failed to fetch search search result!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleGroup = (userToAdd) => {
    // onOpen();
    if (selectedUser?.find((u) => u._id === userToAdd._id)) {
      toast({
        description: "user already added!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setSelectedUser([...selectedUser, userToAdd]);
    setGroupSearchResult([]);
    // setSearchGroupMember("");

    // console.log(selectedUser);
  };
  // console.log(selectedUser);
  const handleGroupSubmit = async () => {
    // alert("on development!");
    if (!groupChatName || selectedUser.length === 0) {
      toast({
        title: "please fill all field",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "https://chat-app-server-ten.vercel.app/api/chat/group",
        {
          chatName: groupChatName,
          users: JSON.stringify(selectedUser.map((u) => u._id)),
        },

        config
      );
      console.log(data);
      setChats([data, ...chats]);
      closeDrawer();
      toast({
        title: "Group Created",
        description: "Say hello to your group members!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error.toString(),
        description: error?.response?.data,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const closeDrawer = () => {
    onClose();
    setSelectedUser([]);
    setGroupSearchResult([]);
  };

  return (
    <div

    // d={{ base: selectedChat ? "d-none" : "flex", md: "flex" }}
    >
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

            <Container position="absolute" top="10%" zIndex={20}>
              {(loading || loadingChat) && (
                <Container
                  _light={{ color: "gray.100" }}
                  className="flex gap-2 items-center"
                >
                  <span>loading</span> <Spinner size="sm" d="flex"></Spinner>
                </Container>
              )}
              {searchResult &&
                searchResultOpen &&
                search !== 0 &&
                searchResult.map((user) => (
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
                <FormControl>
                  <FormLabel htmlFor="groupname">Group Name</FormLabel>
                  <Input
                    id="groupname"
                    placeholder="Please enter group name"
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">Member</FormLabel>
                  <Input
                    id="member"
                    placeholder="Please enter user name or email"
                    onChange={(e) => handleGroupSearch(e.target.value)}
                  />
                </FormControl>
              </Stack>
              {
                /* selected users  */

                selectedUser?.map((user) => (
                  <Stack
                    className="p-1 border rounded my-1"
                    key={user?._id}
                    _light={{
                      bg: "gray.100",
                    }}
                    _dark={{
                      bg: "gray.800",
                    }}
                  >
                    <div className="flex justify-between items-center flex-row overflow-hidden">
                      <span>{user.name}</span>
                      {/* create a remove button  */}
                      <Button
                        onClick={() =>
                          setSelectedUser(
                            selectedUser.filter((u) => u._id !== user._id)
                          )
                        }
                        size="xs"
                        colorScheme="red"
                      >
                        X
                      </Button>
                    </div>
                  </Stack>
                ))
              }
              {
                //create dropdown list of users from search result
                groupLoading ? (
                  <Container
                    _light={{ color: "gray.700" }}
                    className="flex gap-2 items-center"
                  >
                    <span>loading</span> <Spinner size="sm" d="flex"></Spinner>
                  </Container>
                ) : (
                  groupSearchResult?.slice(0, 7).map(
                    (user) =>
                      searchGroupMember !== 0 && (
                        <Box
                          key={user?._id}
                          onClick={() => handleGroup(user)}
                          gap={2}
                          _light={{
                            bg: "gray.100",
                          }}
                          _dark={{
                            bg: "gray.800",
                          }}
                          //create a border on hover
                          _hover={{
                            border: "1px solid",
                            borderColor: "gray.300",
                          }}
                          className="flex items-center mt-1 rounded-lg gap-2 p-2"
                        >
                          <Avatar size="md" name={user.name} src={user.pic} />{" "}
                          <div className="flex flex-col">
                            <span className="overflow-hidden">{user.name}</span>
                            <span className="overflow-hidden">
                              {user.email}
                            </span>
                          </div>
                          {/* <Divider></Divider> */}
                        </Box>
                      )
                  )
                )
              }
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={closeDrawer}>
                Cancel
              </Button>
              <Button onClick={handleGroupSubmit} colorScheme="blue">
                Create!
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
      <Box className="flex justify-center lg:justify-start">
        <MyChats></MyChats>
      </Box>
    </div>
  );
};

export default ChatList;
