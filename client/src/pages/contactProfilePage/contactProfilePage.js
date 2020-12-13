import React, { useState } from 'react';
import './contactProfilePage.css';
import moment from 'moment';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddCustomerNoteModal from '../../components/addCustomerNoteModal/addCustomerNoteModal';
import API from '../../util/API';

export default function contactProfilePage(props) {
  // add new note modal
  const [addNoteShow, setAddNoteShow] = useState(false);

  //   getting customer information from the previous state  on the page

  const [customerData, setCustData] = useState(props.location.state);

  // handling deleting a customer note
  const handleNoteDelete = (e) => {
    let customerId = e.target.value;
    console.log(customerId);

    API.deleteCustNote(customerId).then((res) => {
      console.log(res.data);
      setCustData(res.data);
    });
  };

  return (
    <>
      <div style={{ height: '100%' }}>
        <div className='customerHeader'>
          <div
            style={{
              width: '50%',
              textAlign: 'center',
            }}
          >
            <h1>
              {customerData.firstName} {customerData.lastName}
            </h1>
          </div>
          <div style={{ width: '50%', padding: '10px' }}>
            <div
              style={{
                display: 'flex',

                maxHeight: '50%',
                width: '100%',
              }}
            >
              <div style={{ width: '50%' }}>
                <p>Phone: {customerData.phone}</p>
              </div>
              {/* phone */}
              <div
                style={{
                  width: '50%',
                }}
              >
                <p>Email: {customerData.email}</p>
              </div>
              {/* email */}
            </div>
            <div>
              <h3>
                Address: {customerData.addressStreet} ,{' '}
                {customerData.addressCity} {customerData.addressZipcode}
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
                <div style={{ padding: '17px' }}>
                  <strong>
                    <p>PG&E Information / Electric Service Info</p>
                  </strong>
                  <ListGroup>
                    <ListGroup.Item> Account #: 18273671621</ListGroup.Item>
                    <ListGroup.Item>
                      Electronic Service Id: 18273671687{' '}
                    </ListGroup.Item>
                    <ListGroup.Item>Meter # : 10087627256 </ListGroup.Item>
                    <ListGroup.Item>Rate Schedule: E1</ListGroup.Item>
                    <ListGroup.Item>
                      Name on Account: Larry Crenna
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className='widget'>
                <div style={{ padding: '17px' }}>
                  <strong>
                    <p>Active Projects</p>
                  </strong>
                  {customerData.activeProjects.map((project) => {
                    return (
                      <Card className='activeProjCard' key={project._id}>
                        <Card.Header as='h5'>
                          {project.jobsiteAddress} {project.jobsiteCity},{' '}
                          {project.jobsiteZipcode}
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            {/* {project.modules.model ? <p>Solar PV</p> : null}{' '}
                          {project.battery.model ? (
                            <p>+ Energy Storage</p>
                          ) : null}{' '}
                          Installation */}
                            {project.description}
                          </Card.Title>
                          <Card.Text>
                            <strong>Status: </strong>
                            {project.status}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button variant='primary' block value={project._id}>
                            Project Info Page
                          </Button>
                        </Card.Footer>
                      </Card>
                    );
                  })}
                </div>
              </div>
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
              <Button
                variant='success'
                onClick={() => {
                  setAddNoteShow(true);
                }}
              >
                {' '}
                + Add New Note
              </Button>
              <AddCustomerNoteModal
                customerdata={customerData}
                onHide={() => setAddNoteShow(false)}
                show={addNoteShow}
                setaddnoteshow={setAddNoteShow}
              ></AddCustomerNoteModal>
              {customerData.notes.map((note) => {
                return (
                  <ListGroup.Item key={note._id}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '15px',
                      }}
                    >
                      <div stype={{ width: '85%' }}>
                        <strong>
                          <p>{note.note}</p>
                        </strong>
                        <p className='text-muted'>
                          {moment(note.createdAt).format('MMM Do YYYY')}
                        </p>
                      </div>
                      <div
                        style={{
                          width: '15%',
                        }}
                      >
                        <p>Done</p>
                        <Button
                          variant='danger'
                          value={note._id}
                          onClick={handleNoteDelete}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </div>
      </div>
    </>
  );
}
