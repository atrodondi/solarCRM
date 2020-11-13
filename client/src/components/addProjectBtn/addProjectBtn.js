import React from 'react';
import './addProjectBtn.css';

export default function addProjectBtn(props) {
  return (
    <>
      <button className='createProject' onClick={props.openProjModal}>
        Create Project
      </button>
    </>
  );
}
