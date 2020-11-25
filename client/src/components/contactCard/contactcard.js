import React from 'react';
import './style.css';

export default function contactCard(props) {
  return (
    <>
      <div className='contactCard' id={props.id}>
        <h5>{props.firstName}</h5>
        <h4 className='lastName'>{props.lastName}</h4>
        <p>{props.city}</p>
      </div>
    </>
  );
}
