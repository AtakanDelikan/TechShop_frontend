import React from "react";

function Footer() {
  return (
    <div
      className="footer fixed-bottom text-center p-2 bg-dark text-white"
      // className="footer fixed-bottom text-center p-2 text-white"
      style={{ height: "56px" }}
    >
      {"TechShop by Atakan Delikan."}
      <a
        href="https://github.com/AtakanDelikan"
        target="_blank"
        className="m-4"
        style={{ textDecoration: "none", color: "#ecf2f8", fontWeight: "bold" }}
      >
        {"GitHub "}
        <i className="bi bi-github" style={{ fontSize: "1.5rem" }}></i>
      </a>
      <a
        href="https://linkedin.com/in/atakan-delikan/"
        target="_blank"
        className="m-2"
        style={{ textDecoration: "none", color: "#0a66c2", fontWeight: "bold" }}
      >
        {"LinkedIn "}
        <i className="bi bi-linkedin" style={{ fontSize: "1.5rem" }}></i>
      </a>
    </div>
  );
}

export default Footer;
