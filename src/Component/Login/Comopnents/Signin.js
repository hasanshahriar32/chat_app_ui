import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

const Signin = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const submitHandler = (e) => {
    e.preventDefault();
    fetch("https://chat-app-server-ten.vercel.app/api/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // alert(data.error);
          toast({
            description: `${data.message}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          // alert(data.message);
          toast({
            title: "Login Successful",
            description: "You've been successfully logged in",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter Your Password"
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "HIDE" : "SHOW"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="teal" type="submit" onClick={submitHandler}>
          Sign In
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("guest123");
          }}
        >
          Sign In as Guest
        </Button>
      </VStack>
    </div>
  );
};

export default Signin;
