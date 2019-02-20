import React from "react";
import { Footer } from "react-materialize";
import "./FooterMain.css";

export default function FooterMain() {
  return (
    <Footer
      className="teal"
      copyrights={` \u00A9 ${new Date().getFullYear()} CellMate`}
    >
      <h5 className="white-text">Footer Content</h5>
    </Footer>
  );
}
