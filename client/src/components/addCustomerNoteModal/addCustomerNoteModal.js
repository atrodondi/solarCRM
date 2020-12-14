import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function addCustomerNoteModal(props) {
  // getting customer/client info from props
  const customerData = props.customerdata;

  // handle change of input value
  const handleInputChange = (e) => {
    const { value } = e.target;
    props.setNewNote(value);
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
            props.setNewNote('');
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
              value={props.newNote}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <Button
          variant='info'
          value={customerData._id}
          onClick={props.handleAddNote}
        >
          + Add Note
        </Button>
        <Button
          onClick={() => {
            props.setaddnoteshow(false);
            props.setNewNote('');
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
}
