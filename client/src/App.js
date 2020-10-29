import React, { useState } from "react";
import "./App.css";
import ButtonRow from "./components/buttonRow/buttonRow";
import ContactCard from "./components/contactCard/contactcard";
import API from "./util/API";

export default function App(props) {
  const [content, setContent] = useState([]);

  // gets all contacts when contact button is pressed
  const getContacts = () => {
    console.log("click");
    API.findAllCustomers().then((res) => {
      console.log("contacts: ", res.data);
      setContent(res.data);
    });
    // setContent([2, 3, 4, 5, 6, 7, 8]);
    console.log(content);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Solar CRM trial 1</h2>
        <ButtonRow getContacts={getContacts}></ButtonRow>
      </div>
      <div className="container">
        {content.map((contact) => (
          <ContactCard
            key={contact._id}
            id={contact._id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            city={contact.addressCity}
          />
        ))}
      </div>
    </div>
  );
}
