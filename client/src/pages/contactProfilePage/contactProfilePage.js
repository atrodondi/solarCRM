import React from 'react';
import './contactProfilePage.css';
import moment from 'moment';
import ListGroup from 'react-bootstrap/ListGroup';

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
            <div style={{ width: '50%', backgroundColor: '#74b9ff' }}>
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
          <div className='widgetRow'>
            <div className='widget pgeInfoBox'>
              <div>
                <strong>
                  <p>PG&E Information</p>
                </strong>
                <ListGroup>
                  <ListGroup.Item> Account #: 18273671621</ListGroup.Item>
                  <ListGroup.Item>
                    Electronic Service Id: 18273671687{' '}
                  </ListGroup.Item>
                  <ListGroup.Item>Meter # : 10087627256 </ListGroup.Item>
                  <ListGroup.Item>Rate Schedule: E1</ListGroup.Item>
                  <ListGroup.Item>Name on Account: Larry Crenna</ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div className='widget'>2 - active projects</div>
          </div>
          <div className='widgetRow'>
            <div className='widget'>3 - equipment</div>
            <div className='widget'>
              5-completed projects? maybe something else and just have a
              projects tab above and have it be active or completed
            </div>
          </div>
        </div>
        <div className='notesBox'>
          <ListGroup>
            {customerData.notes.map((note) => {
              return (
                <ListGroup.Item>
                  {note.note} {moment(note.createdAt).format('MMM Do YYYY')}{' '}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </>
  );
}
