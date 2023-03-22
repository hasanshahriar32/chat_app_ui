import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-background">
      {" "}
      <Container className="chat-container" maxW="xl">
        <Box
          className="chat-header"
          d="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          _dark={{
            bg: "gray.800",
          }}
          m="0 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text>Your Chit-Chat App</Text>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
