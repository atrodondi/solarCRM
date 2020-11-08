import React from "react";
import AddContactForm from "../addContactForm/addContactForm";
import "./addContactModal.css";

export default function AddContactModal(props) {
  return props.showModal ? (
    <div className="modalWrapper">
      <div className="modal">
        <button onClick={props.openModal}>Close</button>
        <AddContactForm></AddContactForm>
      </div>
    </div>
  ) : null;
}
