import React from "react";
import "./Header.css";
function Header() {
  return (
    <div className="App">
      <span onClick={() => window.scroll(0, 0)} className="header">
        {" "}
        🎬 Movie Hub 🎬
      </span>
    </div>
  );
}

export default Header;
