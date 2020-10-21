import React, { useState } from "react";
import "./App.css";
import Container from "./components/container/container";
import ButtonRow from "./components/buttonRow/buttonRow";
import ContactCard from "./components/contactCard/contactcard";

export default function App(props) {
  const [content, setContent] = useState([2, 1, 3, 6]);

  const fillContainer = () => {};
  return (
    <div className="App">
      <div className="App-header">
        <h2>Solar CRM trial 1</h2>
        <ButtonRow></ButtonRow>
      </div>
      <Container>
        {content.map(contacts => (
          <ContactCard></ContactCard>
        ))}
      </Container>
    </div>
  );
}
