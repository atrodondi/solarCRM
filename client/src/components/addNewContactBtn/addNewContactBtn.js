import React from "react";
import "./style.css";

export default function addNewContactButton(props) {
  return (
    <>
      <button onClick={props.openModal}>
        Add New Contact{" "}
      </button>
    </>
  );
}
