import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Signin from "./Comopnents/Signin";
import SignUp from "./Comopnents/SignUp";
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
          fontFamily="monospace"
          fontSize="2xl"
        >
          <Text>Your Chit-Chat App</Text>
        </Box>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          _dark={{
            bg: "gray.800",
          }}
          borderRadius="lg"
          borderWidth="1px"
        >
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Signin></Signin>
              </TabPanel>
              <TabPanel>
                <SignUp></SignUp>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
