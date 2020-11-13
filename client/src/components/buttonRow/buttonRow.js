import React from 'react';
import './style.css';
import ContactBtn from '../contactBtn/contactBtn';
import AddNewContactBtn from '../addNewContactBtn/addNewContactBtn';
import AddProjectBtn from '../addProjectBtn/addProjectBtn';
import ContactsSearchBar from '../contactsSearchBar/contactsSearchBar';

export default function buttonRow(props) {
  return (
    <>
      <div className='row'>
        <ContactBtn getContacts={props.getContacts}></ContactBtn>
        <AddNewContactBtn
          setShowModal={props.setShowModal}
          openModal={props.openModal}
        ></AddNewContactBtn>
        <ContactsSearchBar
          searchContacts={props.searchContacts}
        ></ContactsSearchBar>
        <AddProjectBtn
          openProjModal={props.openProjModal}
          clients={props.clients}
        ></AddProjectBtn>
      </div>
    </>
  );
}
