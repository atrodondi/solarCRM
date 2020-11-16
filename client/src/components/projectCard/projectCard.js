import React from 'react';
import './projectCard.css';

export default function projectCard(props) {
  return (
    <>
      <div className='projectCard' id={props.id}>
        <h5>{props.lastName} Residence</h5>
        <p>{props.city}</p>
      </div>
    </>
  );
}
