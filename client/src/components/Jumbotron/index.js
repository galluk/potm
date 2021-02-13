import React from "react";

import './style.css';

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 140, clear: "both", paddingTop: 10, textAlign: "center"}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
