import React from "react";
import "./style.css";

export default function contactCard(props) {
  return (
    <>
      <div className="contactCard">
        <h5>{props.firstName}</h5>
        <h4>{props.lastName}</h4>
        <p>{props.city}</p>
      </div>
    </>
  );
}
