import React from 'react';
import './style.css';

export default function contactBtn(props) {
  return (
    <>
      <button className='button' onClick={props.getContacts}>
        All Contacts
      </button>
    </>
  );
}
