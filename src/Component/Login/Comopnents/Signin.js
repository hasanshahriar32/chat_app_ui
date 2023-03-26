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
import React, { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { ChatContext } from "../../../Context/ChatProvider";

const Signin = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(ChatContext);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  //navigate to home
  let location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

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
        if (data.message == "Invalid email or password") {
          toast({
            title: "Error.",
            description: `${data.message}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("jwt", data.token);
          setUser(data);

          toast({
            title: "Logged In.",
            description: "You are logged in successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          //navigate after setting items to localstorage
          // navigate(from);
          navigate(from, { replace: true });
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Enter Your Password"
              type={show ? "text" : "password"}
              value={password}
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
            toast({
              description: "Do not send personal information at guest mode!!",
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
          }}
        >
          Get Guest Credential
        </Button>
      </VStack>
    </div>
  );
};

export default Signin;
