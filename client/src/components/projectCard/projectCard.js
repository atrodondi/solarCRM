import React from 'react';
import './projectCard.css';
import { Link } from 'react-router-dom';

export default function projectCard(props) {
  const projInfo = props.projInfo;
  return (
    <>
      <Link
        id='projectCard'
        to={{
          pathname: '/projectInfo',
          state: projInfo,
        }}
      >
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
      </Link>
    </>
  );
}
