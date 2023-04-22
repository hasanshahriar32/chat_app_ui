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
  AvatarGroup,
} from "@chakra-ui/react";

import React, { useContext } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { ChatContext, ChatState } from "../../../../Context/ChatProvider";
import axios from "axios";

export default function GroupModal({ current }) {
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
    if (selectedChat?.groupAdmin?._id !== user?._id) {
      toast({
        title: "Only admins can delete the group!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
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
        className="btn-circle btn-sm absolute  btn btn-outline btn-accent z-10 top-4 right-10"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        <AiOutlineMenuUnfold className="text-xl"></AiOutlineMenuUnfold>
      </button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader className="flex flex-col gap-2 justify-between items-center">
            {" "}
            <AvatarGroup size="md" max={5} min={selectedChat?.users.length}>
              {selectedChat?.users.map((ava) => (
                <Avatar key={ava?._id} name={ava?.name} src={ava?.pic} />
              ))}
            </AvatarGroup>
            <span>{selectedChat?.chatName}</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-center"></ModalBody>
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
