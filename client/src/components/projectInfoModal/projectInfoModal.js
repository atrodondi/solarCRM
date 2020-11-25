import React from 'react';
import './projectInfoModal.css';
import moment from 'moment';

export default function projectInfoModal(props) {
  //getting notes so we can map throough em
  const notes = props.projInfo.notes;

  //render if modal is showing
  return props.showProjInfoModal ? (
    <>
      <div className='modalWrapper'>
        <div className='Modal'>
          <button className='closeButton' onClick={props.openProjInfoModal}>
            &#10006;
          </button>
          <h1 className='title'>{props.projInfo.client.lastName} Project</h1>
          <hr></hr>
          <h4 className='status'>Contract Signed</h4>
          <div className='Row'>
            <h3> Equipment:</h3>
            <div className='Box'>
              {/* need to map through modules here, and for inverters and  anything that is stored as an array in case there are different modules or inverters etc, should prob throw optimizers in there as well. */}
              <h2>- Modules -</h2>
              <hr />
              <h5> Make: {props.projInfo.modules.make}</h5>
              <h5>Model: {props.projInfo.modules.model}</h5>
              <h3>({props.projInfo.modules.amount})</h3>
            </div>
            <div className='Box'>
              <h2>- Inverters -</h2>
              <hr />
              <h5>Make: {props.projInfo.inverter.make}</h5>
              <h5>Model: {props.projInfo.inverter.model}</h5>
              <h3>({props.projInfo.inverter.amount})</h3>
            </div>
            <div className='Box'>
              <h2>- Storage -</h2>
              <hr />
              <h5>Make: {props.projInfo.battery.make}</h5>
              <h5>Model: {props.projInfo.battery.model}</h5>
              <h3>({props.projInfo.battery.amount})</h3>
            </div>
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
            <div className='Box'>
              <h3>Signed Contract</h3>
              <a href='#'>Veiw / Download</a>
            </div>
          </div>
          <div className='Row'>
            <h3>Notes:</h3>
            <div className='Box'>
              {notes.map((note) => {
                if (note) {
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
          <div className='Row'>
            {/* this is where i want to put the form to upload docs with Filepond */}
          </div>
        </div>
        {/*end modal  */}
      </div>{' '}
      {/*end modalWrapper background*/}
    </>
  ) : null;
}
