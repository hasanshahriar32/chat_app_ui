import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/login">
        <Button>Login to Start</Button>
      </Link>
    </div>
  );
};

export default Home;