import React from "react";

function ScrollToTopButton() {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button className="btn btn-link  z-50" onClick={handleClick}>
      Scroll to Top
    </button>
  );
}

export default ScrollToTopButton;
