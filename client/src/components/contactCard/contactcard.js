import React from 'react';
import './contactcard.css';

export default function contactCard(props) {
  return (
    <>
      <a id='contactCard' href='/contactProfile'>
        <div className='contactCard' id={props.id}>
          <div className='contactCard-header'>
            <p>{props.address}</p>
            <p>
              {props.city}, CA {props.zipcode}
            </p>
          </div>
          <div className='contactCard-body'>
            <h4>
              {props.firstName} {props.lastName}
            </h4>
            <p>{props.phone}</p>
            <p>{props.email}</p>
          </div>
        </div>
      </a>
    </>
  );
}
