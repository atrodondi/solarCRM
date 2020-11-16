import React from 'react';
import './allProjectsBtn.css';

export default function allProjectsBtn(props) {
  return (
    <>
      <button className='allProjectsBtn' onClick={props.getProjects}>
        All Projects
      </button>
    </>
  );
}
