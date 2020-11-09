import React from "react";

export default function AddContactForm(props) {
  return (
    <>
      <form>
        <label>
          First Name:
          <input type="text" name="name" value={props.firstName} autocomplete="off" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      ;
    </>
  );
}
