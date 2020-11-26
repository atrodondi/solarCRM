import React, { useState } from 'react';
import './App.css';
import AddContactModal from './components/addContactModal/addContactModal';
import ButtonRow from './components/buttonRow/buttonRow';
import ContactCard from './components/contactCard/contactcard';
import API from './util/API';
import AddProjModal from './components/addProjModal/addProjModal';
import ProjectCard from './components/projectCard/projectCard';
import ProjectInfoModal from './components/projectInfoModal/projectInfoModal';

export default function App(props) {
  //setting content of main div of app (which is dashboard kind of thing for now)
  const [content, setContent] = useState([]);

  //array of all clients in db
  const [clients, setClients] = useState([]);

  //state of showing the add contact modal
  const [showModal, setShowModal] = useState(false);

  // state of showing the add project modal
  const [showProjModal, setShowProjModal] = useState(false);

  // state of showing project info modal
  const [showProjInfoModal, setShowProjInfoModal] = useState(false);

  // state of project info modal content (project information from API)
  const [projInfo, setProjInfo] = useState({});

  //function to open add contact modal
  const openModal = () => {
    setShowModal(prev => !prev);
    setShowProjModal(false);
  };

  // function to open new project modal
  const openProjModal = () => {
    setShowProjModal(prev => !prev);
    setShowModal(false);
    getClients();
  };

  // function to open project info modal
  const openProjInfoModal = e => {
    let projId = e.target.id;

    // no need to make api call if the Modal is already showing and we want to close the modal, make sure ID is picked up so we dont mess up API call
    if (showProjInfoModal === false && projId !== '') {
      console.log('project id---->', projId);

      API.findProjById(projId).then((res, err) => {
        if (err) throw err;
        console.log(res.data);
        setProjInfo(res.data);
        setShowProjInfoModal(prev => !prev);
        setShowProjModal(false);
        setShowModal(false);
      });
    } else {
      // close the modal if it is open
      setShowProjInfoModal(false);
    }
  };

  // gets all contacts when contact button is pressed and showing it in main content div
  const getContacts = () => {
    setContent([]);
    API.findAllCustomers().then(res => {
      setContent(res.data);
    });
  };

  // get clients when adding a project, or just so we can call it upon mount to have an updated client list at all times
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

  //get all projects and put in main content div (all projeects btn press)
  const getProjects = () => {
    setContent([]);
    API.findAllProjects().then(res => {
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
          getProjects={getProjects}
        ></ButtonRow>
      </div>
      <ProjectInfoModal
        projInfo={projInfo}
        showProjInfoModal={showProjInfoModal}
        openProjInfoModal={openProjInfoModal}
      ></ProjectInfoModal>
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
        {content.map(contact => {
          if (contact.type === 'customer') {
            return (
              <ContactCard
                key={contact._id}
                id={contact._id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                city={contact.addressCity}
              />
            );
          } else if (contact.type === 'project') {
            return (
              <ProjectCard
                key={contact._id}
                id={contact._id}
                lastName={contact.client.lastName}
                address={contact.jobsiteAddress}
                city={contact.jobsiteCity}
                zipcode={contact.jobsiteZipcode}
                openProjInfoModal={openProjInfoModal}
              />
            );
          }
        })}
      </div>
      <div>
        {/* Here is was testing to see if i can render the base 64 string, it was working {base64String ? (
          <img src={`data:image/png;base64,${base64String}`}></img>
        // ) : null} */}
      </div>
    </div>
  );
}
