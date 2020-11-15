import React, { useState } from 'react';
import './App.css';
import AddContactModal from './components/addContactModal/addContactModal';
import ButtonRow from './components/buttonRow/buttonRow';
import ContactCard from './components/contactCard/contactcard';
import API from './util/API';
import AddProjModal from './components/addProjModal/addProjModal';

export default function App(props) {
  //setting content of main div of app (which is dashboard kind of thing for now)
  const [content, setContent] = useState([]);

  //array of all clients in db
  const [clients, setClients] = useState([]);

  //state of showing the add contact modal
  const [showModal, setShowModal] = useState(false);

  // state of showing the add project modal
  const [showProjModal, setShowProjModal] = useState(false);

  //function to open add contact modal
  const openModal = () => {
    setShowModal(prev => !prev);
  };

  // function to open new project modal
  const openProjModal = () => {
    setShowProjModal(prev => !prev);
    getClients();
  };

  // gets all contacts when contact button is pressed and showing it in main content div
  const getContacts = () => {
    API.findAllCustomers().then(res => {
      setContent(res.data);
    });
  };

  // get clients when adding project
  const getClients = () => {
    API.findAllCustomers().then(res => {
      setClients(res.data);
    });
  };

  // search contacts by name
  const searchContacts = query => {
    API.searchContactsByName(query).then(res => {
      setContent(res.data);
    });
  };

  //render
  return (
    <div className='App'>
      <div className='App-header'>
        <ButtonRow
          getContacts={getContacts}
          openModal={openModal}
          setShowModal={setShowModal}
          searchContacts={searchContacts}
          openProjModal={openProjModal}
          setShowProjModal={setShowProjModal}
        ></ButtonRow>
      </div>
      <AddContactModal
        getContacts={getContacts}
        showModal={showModal}
        setShowModal={setShowModal}
        openModal={openModal}
        setClients={setClients}
        setContent={setContent}
      ></AddContactModal>
      <AddProjModal
        openProjModal={openProjModal}
        setShowProjModal={setShowProjModal}
        showProjModal={showProjModal}
        getContacts={getContacts}
        content={content}
        getClients={getClients}
        clients={clients}
      ></AddProjModal>
      <div className='container'>
        {content.map(contact => (
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
