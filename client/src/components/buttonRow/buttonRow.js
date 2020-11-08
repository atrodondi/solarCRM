import React from "react";
import "./style.css";
import ContactBtn from "../contactBtn/contactBtn";
import AddNewContactBtn from "../addNewContactBtn/addNewContactBtn";

export default function buttonRow(props) {
  return (
    <>
      <div className="row">
        <ContactBtn getContacts={props.getContacts}></ContactBtn>
        <AddNewContactBtn
          setShowModal={props.setShowModal}
          openModal={props.openModal}
        ></AddNewContactBtn>
      </div>
    </>
  );
}
