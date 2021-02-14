import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 140, clear: "both", paddingTop: 10, textAlign: "center", backgroundColor: "rgb(243, 255, 229)" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
