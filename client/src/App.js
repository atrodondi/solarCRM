import React, { useState } from 'react';
import './App.css';
import AddContactModal from './components/addContactModal/addContactModal';
import ButtonRow from './components/buttonRow/buttonRow';
import ContactCard from './components/contactCard/contactcard';
import API from './util/API';
import AddProjModal from './components/addProjModal/addProjModal';
import ProjectCard from './components/projectCard/projectCard';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

export default function App(props) {
  //file pond
  const [files, setFiles] = useState(null);

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
    setShowModal((prev) => !prev);
    setShowProjModal(false);
  };

  // function to open new project modal
  const openProjModal = () => {
    setShowProjModal((prev) => !prev);
    setShowModal(false);
    getClients();
  };

  // gets all contacts when contact button is pressed and showing it in main content div
  const getContacts = () => {
    setContent([]);
    API.findAllCustomers().then((res) => {
      setContent(res.data);
    });
  };

  // get clients when adding a project, or just so we can call it upon mount to have an updated client list at all times
  const getClients = () => {
    API.findAllCustomers().then((res) => {
      setClients(res.data);
    });
  };

  // search contacts by name
  const searchContacts = (query) => {
    API.searchContactsByName(query).then((res) => {
      setContent(res.data);
    });
  };

  //get all projects and put in main content div (all projeects btn press)
  const getProjects = () => {
    setContent([]);
    API.findAllProjects().then((res) => {
      setContent(res.data);
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!files || files === undefined || files === null || files.length === 0) {
      alert('please add a file');
    } else {
      let newFile = files[0].file;
      let base64Str = files[0].getFileEncodeBase64String();
      let uploadObj = {
        file: base64Str,
        fileName: newFile.name,
        fileType: newFile.type,
        projId: '5fb8b8efed2cdc0cb85302fa',
        newDocument: 'signedContract',
      };
      console.log('upload object to send to back end', uploadObj);
      API.upload(uploadObj).then((result) => console.log(result));
    }
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
        {content.map((contact) => {
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
                city={contact.jobsiteCity}
              />
            );
          }
        })}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <FilePond
            allowProcess={false}
            instantUpload={false}
            allowFileEncode={true}
            dropOnElement={true}
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            server={{
              process: (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort,
                transfer,
                options
              ) => {
                // fieldName is the name of the input field
                // file is the actual file object to send
                const formData = new FormData();
                formData.append(fieldName, file, file.name);

                const request = new XMLHttpRequest();
                request.open('POST', '/uploads');

                // Should call the progress method to update the progress to 100% before calling load
                // Setting computable to false switches the loading indicator to infinite mode
                request.upload.onprogress = (e) => {
                  progress(e.lengthComputable, e.loaded, e.total);
                };

                // Should call the load method when done and pass the returned server file id
                // this server file id is then used later on when reverting or restoring a file
                // so your server knows which file to return without exposing that info to the client
                request.onload = function () {
                  if (request.status >= 200 && request.status < 300) {
                    // the load method accepts either a string (id) or an object
                    load(request.responseText);
                  } else {
                    // Can call the error method if something is wrong, should exit after
                    error('oh no');
                  }
                };

                request.send(formData);

                // Should expose an abort method so the request can be cancelled
                return {
                  abort: () => {
                    // This function is entered if the user has tapped the cancel button
                    request.abort();

                    // Let FilePond know the request has been cancelled
                    abort();
                  },
                };
              },
            }}
            name='files'
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          <button type='submit'>Submit</button>
        </form>

        {/* Here is was testing to see if i can render the base 64 string, it was working {base64String ? (
          <img src={`data:image/png;base64,${base64String}`}></img>
        // ) : null} */}
      </div>
    </div>
  );
}
