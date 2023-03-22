import { Button, Container } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="login-background">
      <Container maxW="xl">
        <Link to="/chat">
          <Button>Start Chatting</Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;
