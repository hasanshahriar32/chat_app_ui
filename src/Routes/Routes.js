import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "../Component/Chat/Chat";
import { Button, Container } from "@chakra-ui/react";
import Home from "../Component/Home/Home";
import Login from "../Component/Login/Login";
import Navbar from "../Component/Navigation/Navbar";
import Main from "../Main/Main";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        { path: "/", element: <Home></Home> },
        {
          path: "/chat",
          element: <Chat></Chat>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Login></Login>,
        },
      ],
    },
    {
      path: "/*",
      element: (
        <div>
          <Navbar></Navbar>
          <Container>
            <h1>404: Not Found</h1>
          </Container>
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default Routes;
