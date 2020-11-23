import React from 'react';
import './projectInfoModal.css';

export default function projectInfoModal(props) {
  return props.showProjInfoModal ? (
    <>
      <div className='modalWrapper'>
        <div className='Modal'>
          <button className='closeButton' onClick={props.openProjInfoModal}>
            &#10006;
          </button>
          <h1 className='title'>{props.projInfo.client.lastName} Project</h1>
          <h4 className='status'>Contract Signed</h4>
          <div className='equip-Row'>
            <h3> Equipment:</h3>
            <div className='modulesBox'>
              <h2>- Modules -</h2>
              <h5> Make: LG</h5>
              <h5>Model: LG33KN1K-V5</h5>
              <h3>(18)</h3>
            </div>
            <div className='inverterBox'>
              <h2>- Inverters -</h2>
              <h5>Make: Solar Edge</h5>
              <h5>Model: SE7600H-USS33BBC14</h5>
              <h3>(1)</h3>
            </div>
            <div className='batteryBox'>
              <h2>- Storage -</h2>
              <h5>Make: LG Chem</h5>
              <h5>Model: RESU10H</h5>
              <h3>(2)</h3>
            </div>
            <div className='buiBox'>
              <h2>- BUIs -</h2>
              <h5>Make: Solar Edge</h5>
              <h5>Model: BI-EUSGN-01</h5>
              <h3>(1)</h3>
            </div>
          </div>
        </div>
        {/*end modal  */}
      </div>{' '}
      {/*end modalWrapper background*/}
    </>
  ) : null;
}
