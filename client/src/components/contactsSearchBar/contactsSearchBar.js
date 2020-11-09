import React, { useState } from "react";
import "./style.css";

export default function contactSearchBar(props) {
  // contents of searchbar, the query
  const [query, setQuery] = useState("");

  //   handle searchbar change
  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(event.target.value);
    props.searchContacts(event.target.value); //basically doing a search as user types so no need to hit enter. and the results change with state, kinda cool
  };

  // handles the clicking of the submit button on search bar
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query);
    setQuery("");
    console.log(query);
  };

  //   "render"
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Search Contacts:
          <input
            type="text"
            name="name"
            value={query}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
