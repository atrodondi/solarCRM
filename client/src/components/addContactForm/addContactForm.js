import React from "react";

export default function AddContactForm(props) {
  return (
    <>
      <form>
        <label>
          Name:
          <input type="text" name="name" autocomplete="off" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      ;
    </>
  );
}
