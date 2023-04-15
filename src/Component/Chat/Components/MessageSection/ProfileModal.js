import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { ChatContext, ChatState } from "../../../../Context/ChatProvider";
import axios from "axios";

export default function ProfileModal({ current }) {
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const { selectedChat } = ChatState();
  const { user, setUser, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const toast = useToast();
  const deleteChat = async () => {
    try {
      //   setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(
        `https://chat-app-server-ten.vercel.app/api/chat/${selectedChat._id}`,
        config
      );
      //   setLoading(false);
      console.log(data);
      setSelectedChat(null);
      if (data.deletedCount > 0) {
        toast({
          title: "Chat Deleted Successfully!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else if (data.deletedCount === 0) {
        toast({
          title: "Already Deleted!",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      //   setLoading(false);
      toast({
        title: "Error Occurred.",
        description: "Failed to delete the chat!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  //   console.log(current);
  return (
    <>
      <button
        className="absolute  btn btn-outline btn-accent z-10 top-2 left-24"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        <CgProfile></CgProfile>
      </button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader className="flex flex-col gap-2 justify-between items-center">
            {" "}
            <Avatar size="2xl" name={current?.name} src={current?.pic} />{" "}
            <span>{current?.name}</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-center">Email: {current?.email}</ModalBody>
          <ModalFooter>
            <Button
              className="mr-2"
              colorScheme="red"
              variant="solid"
              onClick={deleteChat}
            >
              Delete Chat
            </Button>
            <Button variant="outline" colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
