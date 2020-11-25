import React from 'react';
import './projectCard.css';

export default function projectCard(props) {
  return (
    <>
      <div
        className='projectCard'
        id={props.id}
        onClick={props.openProjInfoModal}
      >
        <h2 className='project-name'>{props.lastName} Project</h2>
        <p>
          {props.address}, {props.city} CA {props.zipcode}
        </p>
      </div>
    </>
  );
}
