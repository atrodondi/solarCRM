import React from "react";
import "./style.css";
import ContactBtn from "../contactBtn/contactBtn";

export default function buttonRow(props) {
  return (
    <>
      <div className="row">
        <ContactBtn></ContactBtn>
      </div>
    </>
  );
}
