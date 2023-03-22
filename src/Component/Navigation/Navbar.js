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
import { Link } from "react-router-dom";

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "white");

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg={useColorModeValue("white", "gray.800")}
      color={textColor}
    >
      <Flex
        style={{ display: "flex", justifyContent: "space-between" }}
        align="center"
      >
        <Box>
          <Link to="/">
            <Box style={{ marginRight: 50 }} fontSize="lg" fontWeight="bold">
              ChatFriend
            </Box>
          </Link>
        </Box>
        <Spacer />
        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            icon={show ? <HiX /> : <HiMenu />}
            aria-label="Toggle Navigation"
          />
        </Box>
      </Flex>
      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: 4, md: 0 }}
        alignItems="center"
        flexGrow={1}
        spacing={6}
      >
        <Link to="/">
          <Box>Home</Box>
        </Link>
        <Link to="/login">
          <Box>Login</Box>
        </Link>

        <Link to="/chat">
          <Box>Chat</Box>
        </Link>
        <Link to="/about">
          <Box>About</Box>
        </Link>
        <Link to="/contact">
          <Box>Contact</Box>
        </Link>
      </Stack>
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        icon={<RxMoon />}
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
      />
      <Box style={{ marginLeft: 30 }}>
        <Link to="/profile">
          <RxAvatar />
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
