import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer/Footer";
import Navbar from "../Component/Navigation/Navbar";
import { ChatState } from "../Context/ChatProvider";

const Main = () => {
  const { selectedChat } = ChatState();
  return (
    <div>
      <div className="hidden lg:block">
        <Navbar></Navbar>
      </div>
      {!selectedChat && (
        <div className="lg:hidden block">
          <Navbar></Navbar>
        </div>
      )}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
