import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
// import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { ChatContext } from "../../../Context/ChatProvider";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { user, setUser } = useContext(ChatContext);
  const [pic, setPic] = useState();
  const toast = useToast();

  //navigate to home
  let location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // alert("Password and Confirm Password must be same");
      toast({
        title: "Mismatch.",
        description: "Password and Confirm Password must be same",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      fetch("https://chat-app-server-ten.vercel.app/api/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          pic,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // alert(data.error);
            toast({
              description: `${data.error}`,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            // alert(data.message);
            setUser(data);
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("jwt", data.token);
            //navigate after setting items to localstorage
            // navigate(from);
            navigate(from, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);

          toast({
            description: err,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <div>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </FormControl>
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
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Confirm Your Password"
              type={show ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "HIDE" : "SHOW"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Profile Picture</FormLabel>
          <Input
            placeholder="Enter Your Profile Picture URL"
            defaultValue=""
            onChange={(e) => setPic(e.target.value)}
          ></Input>
        </FormControl>
        <Button colorScheme="teal" type="submit" onClick={submitHandler}>
          Sign Up
        </Button>
      </VStack>
    </div>
  );
};

export default SignUp;
