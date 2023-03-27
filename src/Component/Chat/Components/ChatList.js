import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TiGroupOutline } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { MdPersonSearch } from "react-icons/md";
const ChatList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconSearch = MdPersonSearch;
  return (
    <div>
      <>
        <div className="flex gap-2 m-2">
          <Box>
            <Input id="username" placeholder={"search user"} />
          </Box>
          <Button
            leftIcon={<TiGroupOutline />}
            colorScheme="teal"
            onClick={onOpen}
          ></Button>
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
    </div>
  );
};

export default ChatList;
