import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiMenu, HiX } from "react-icons/hi";
import { RxAvatar, RxMoon } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { SlLogin } from "react-icons/sl";

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="flex-end"
      wrap="wrap"
      padding={6}
      bg={useColorModeValue("white", "gray.800")}
      color={textColor}
    >
      <Box>
        <NavLink to="/chat">
          <Box style={{ marginRight: 50 }} fontSize="lg" fontWeight="bold">
            ChatFriend
          </Box>
        </NavLink>
      </Box>
      <Spacer />
      {/* <Flex
        style={{ display: "flex", justifyContent: "flex-end" }}
        align="center"
      >
        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            icon={show ? <HiX /> : <HiMenu />}
            aria-label="Toggle Navigation"
          />
        </Box>
      </Flex> */}
      {/* <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: 4, md: 0 }}
        alignItems="center"
        flexGrow={1}
        spacing={6}
      >
        <NavLink to="/">
          <Box>Home</Box>
        </NavLink>
        <NavLink to="/login">
          <Box>Login</Box>
        </NavLink>

        <NavLink to="/chat">
          <Box>Chat</Box>
        </NavLink>
        <NavLink to="/about">
          <Box>About</Box>
        </NavLink>
        <NavLink to="/contact">
          <Box>Contact</Box>
        </NavLink>
      </Stack> */}
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        icon={<RxMoon />}
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
      />
      <Box style={{ marginLeft: 30 }}>
        <NavLink to="/login">
          <SlLogin fontWeight="5" />
        </NavLink>
      </Box>
    </Flex>
  );
};

export default Navbar;
