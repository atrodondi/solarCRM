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
          <hr></hr>
          <h4 className='status'>Contract Signed</h4>
          <div className='Row'>
            <h3> Equipment:</h3>
            <div className='Box'>
              {/* need to map through modules here, and for inverters and  anything that is stored as an array in case there are different modules or inverters etc, should prob throw optimizers in there as well. */}
              <h2>- Modules -</h2>
              <hr />
              <h5> Make: LG</h5>
              <h5>Model: LG33KN1K-V5</h5>
              <h3>(18)</h3>
            </div>
            <div className='Box'>
              <h2>- Inverters -</h2>
              <hr />
              <h5>Make: Solar Edge</h5>
              <h5>Model: SE7600H-USS33BBC14</h5>
              <h3>(1)</h3>
            </div>
            <div className='Box'>
              <h2>- Storage -</h2>
              <hr />
              <h5>Make: LG Chem</h5>
              <h5>Model: RESU10H</h5>
              <h3>(2)</h3>
            </div>
            <div className='Box'>
              <h2>- BUIs -</h2>
              <hr />
              <h5>Make: Solar Edge</h5>
              <h5>Model: BI-EUSGN-01</h5>
              <h3>(1)</h3>
            </div>
            <div className='clPanelBox'></div>
          </div>
          <div className='Row'>
            <h3>Documents: </h3>
            <div className='Box'>
              <h3>Signed Contract</h3>
              <a href='#'>Veiw / Download</a>
            </div>
          </div>
        </div>
        {/*end modal  */}
      </div>{' '}
      {/*end modalWrapper background*/}
    </>
  ) : null;
}
