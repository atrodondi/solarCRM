import React, { useState } from 'react';
import './projectInfoModal.css';
import moment from 'moment';
import API from '../../util/API';

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

export default function projectInfoModal(props) {
  //getting notes so we can map throough em
  const notes = props.projInfo.notes;
  const projId = props.projInfo._id;

  // new document that is being uploaded
  const [newDocument, setNewDocument] = useState('');
  //file pond files
  const [files, setFiles] = useState(null);

  // handle submit of file upload
  const handleSubmit = (e) => {
    e.preventDefault();

    // checking to make sure that files has a file
    if (!files || files === undefined || files === null || files.length === 0) {
      alert('please add a file');
    } else {
      let newFile = files[0].file;
      let base64Str = files[0].getFileEncodeBase64String();
      // creating the object we want to send to back end to add to database
      let uploadObj = {
        file: base64Str,
        fileName: newFile.name,
        fileType: newFile.type,
        projId: projId,
        document: newDocument,
      };
      console.log('upload object to send to back end', uploadObj);
      API.upload(uploadObj).then((result) => {
        console.log(result);
        // resetting info to update the dom. prob need to reorganize entire app to make this less gross and sloppy with so many props. maybe use pages instead of modals. for this at least...
        props.setProjInfo(result.data);
      });
      setFiles(undefined);
    }
  };

  //render if modal is showing
  return props.showProjInfoModal ? (
    <>
      <div className='modalWrapper'>
        <div className='Modall'>
          <button className='closeButton' onClick={props.openProjInfoModal}>
            &#10006;
          </button>
          <div className='modallHeader'>
            <div style={{ display: 'block' }}>
              <p style={{ marginLeft: '5px' }}>
                {props.projInfo.jobsiteAddress} , {props.projInfo.jobsiteCity}{' '}
              </p>

              <p>CA {props.projInfo.jobsiteZipcode}</p>
            </div>
            <div style={{ margin: 'auto' }}>
              <h2 className='title'>
                {props.projInfo.client.lastName} Project || Status:{' '}
                {props.projInfo.status}
              </h2>
            </div>
          </div>

          <hr></hr>
          <div className='Row'>
            <h3> Equipment:</h3>
            <div className='Box'>
              {/* need to map through modules here, and for inverters and  anything that is stored as an array in case there are different modules or inverters etc, should prob throw optimizers in there as well. */}
              <div>
                <div className='boxTitle'>
                  <h2> Modules </h2>
                </div>
              </div>
              <hr />
              <div className='boxTitle'>
                <h5> Make: {props.projInfo.modules.make}</h5>
              </div>
              <div className='boxTitle'>
                <h5>Model: {props.projInfo.modules.model}</h5>
              </div>
              <div className='boxTitle'>
                <h3>Amount: {props.projInfo.modules.amount}</h3>
              </div>
            </div>
            <div className='Box'>
              <h2> Inverters </h2>
              <hr />
              <h5>Make: {props.projInfo.inverter.make}</h5>
              <h5>
                Model: <br />
                {props.projInfo.inverter.model}
              </h5>
              <h3>({props.projInfo.inverter.amount})</h3>
            </div>
            {props.projInfo.battery ? (
              <div className='Box'>
                <h2>- Storage -</h2>
                <hr />
                <h5>
                  Make:
                  <br /> {props.projInfo.battery.make}
                </h5>
                <h5>Model: {props.projInfo.battery.model}</h5>
                <h3>({props.projInfo.battery.bamount})</h3>
              </div>
            ) : null}
            <div className='Box'>
              <h2>- Optimizers -</h2>
              <hr />
              <h5>Make: {props.projInfo.optimizer.make}</h5>
              <h5>Model: {props.projInfo.optimizer.model}</h5>
              <h3>({props.projInfo.optimizer.amount})</h3>
            </div>
          </div>
          <div className='Row'>
            <h3>Documents: </h3>
            {props.projInfo.documents.map((document) => {
              return (
                <div className='Box' key={document._id}>
                  <h3>{document.document}</h3>
                  <p style={{ color: 'grey' }}>
                    {moment(document.createdAt).format('MMM Do YYYY')}
                  </p>
                  <a
                    href={'data:application/pdf;base64, ' + document.file}
                    download={document.fileName}
                  >
                    Download
                  </a>
                </div>
              );
            })}
          </div>
          <div className='Row'>
            <h3>Notes:</h3>
            <div className='Box'>
              {notes.map((note) => {
                if (note._id) {
                  return (
                    <div key={note._id}>
                      <p>{note.note}</p>
                      <p>{moment(note.createdAt).format('MMM Do YYYY')}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className='filePond-row'>
            <h3>File Upload:</h3>
            <FilePond
              allowProcess={false}
              instantUpload={false}
              allowFileEncode={true}
              dropOnElement={true}
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={{
                // out of the box function that according to FilePond author works around the first object being sent to back end being the metadata, often times being blank and leaving a blank insertion into the DB. this server/process addition works around that. and it did. thank you stack overflow
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
            <label>What document are you uploading?</label>
            <select
              style={{ marginLeft: '3px' }}
              name='newDocument'
              value={newDocument}
              onChange={(event) => {
                setNewDocument(event.target.value);
              }}
            >
              <option>...</option>
              <option value='signedContract'>Signed Contract</option>
              <option value='plansets'>Plan Sets</option>
              <option value='permit'>Permit</option>
              <option value='finalPermit'>Final Permit: Signed Off</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
            {/* this is where i want to put the form to upload docs with Filepond */}
          </div>
        </div>
        {/*end modal  */}
      </div>{' '}
      {/*end modalWrapper background*/}
    </>
  ) : null;
}
