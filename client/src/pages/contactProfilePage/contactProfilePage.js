import React from 'react';
import './contactProfilePage.css';
import moment from 'moment';

export default function contactProfilePage(props) {
  const customerData = props.location.state;
  return (
    <>
      <div className='customerHeader'>
        <div
          style={{
            width: '50%',
            backgroundColor: 'purple',
            textAlign: 'center',
          }}
        >
          <h1>
            {customerData.firstName} {customerData.lastName}
          </h1>
        </div>
        <div
          style={{ width: '50%', backgroundColor: 'orange', padding: '10px' }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: 'red',
              maxHeight: '50%',
              width: '100%',
            }}
          >
            <div
              style={{ width: '50%', backgroundColor: '#74b9ff', width: '50%' }}
            >
              <p>Phone: {customerData.phone}</p>
            </div>
            {/* phone */}
            <div
              style={{
                backgroundColor: '#00cec9',
                width: '50%',
              }}
            >
              <p>Email: {customerData.email}</p>
            </div>
            {/* email */}
          </div>
          <div>
            <h3>
              Address: {customerData.addressStreet} , {customerData.addressCity}{' '}
              {customerData.addressZipcode}
            </h3>
          </div>
        </div>
        {/*end of orange div */}

        {/* end of header */}
      </div>
      <div id='contentContainer'>
        <div id='widgetBox'>
          <div className='row'>
            <div className='widget'>
              1<div>PGE INFO</div>
            </div>
            <div className='widget'>2</div>
          </div>
          <div className='row'>
            <div className='widget'>1</div>
            <div className='widget'>2</div>
          </div>
        </div>
        <div className='notesBox'>
          {customerData.notes.map((note) => {
            return (
              <div style={{ borderStyle: 'solid', borderColor: 'black' }}>
                <p>
                  {note.note} {moment(note.createdAt).format('MMM Do YYYY')}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
