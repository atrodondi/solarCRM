import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import API from '../../util/API';

export default function addCustomerNoteModal(props) {
  // getting customer/client info from props
  const customerData = props.customerdata;

  //   new note state
  const [newNote, setNewNote] = useState('');

  // handle change of input value
  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewNote(value);
  };

  //   handle click of add note button
  const handleAddNote = (e) => {
    let note = {
      note: newNote,
      customer: e.target.value,
    };
    API.addCustNote(note).then((res) => {
      console.log('response from adding customer note', res.data);
      if (res.data) {
        setNewNote('');
        props.setaddnoteshow(false);
      } else {
        alert('Uhoh. Something went wrong!');
      }
    });
  };

  return props.show ? (
    <Modal
      show={props.show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add New Note for {customerData.firstName} {customerData.lastName}
        </Modal.Title>
        <Button
          variant='light'
          onClick={() => {
            props.setaddnoteshow(false);
            setNewNote('');
          }}
        >
          &#10006;
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Note Body:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={newNote}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <Button variant='info' value={customerData._id} onClick={handleAddNote}>
          + Add Note
        </Button>
        <Button
          onClick={() => {
            props.setaddnoteshow(false);
            setNewNote('');
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
}
