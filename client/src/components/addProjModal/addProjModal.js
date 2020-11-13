import React, { useState, useEffect } from 'react';
import './addProjModal.css';

export default function addProjModal(props) {
  // clients
  // new project state
  const [NewProject, setNewProject] = useState({
    client: '',
    contractSignDate: '',
    contractTotal: '',
    deposit: '',
    designEngFee: '',
    jobsiteAddress: '',
    jobsiteSuite: '',
    jobsiteCity: '',
    jobsiteZipcode: '',
    jobsiteCounty: '',
    inverters: [],
    modules: [],
    buis: []
  });

  // handle change of input value of add project form
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewProject(state => ({ ...state, [name]: value }));
  };

  //   GET CLientS when component mounts
  useEffect(() => {
    props.getClients();
  });

  return props.showProjModal ? (
    <div className='modalWrapper'>
      <div className='modal'>
        <button className='closeButton' onClick={props.openProjModal}>
          &#10006;
        </button>
        <br />
        <br />
        <div className='formContainer'>
          <form>
            <label>
              Client:
              <br />
              <select
                name='client'
                value={NewProject.client}
                onChange={handleInputChange}
              >
                {/* map out options */}
                {props.clients.map(contact => (
                  <option
                    value={contact.lastName + ' ' + contact.lastName}
                    key={contact._id}
                    id={contact._id}
                  >
                    {contact.lastName + ', ' + contact.lastName}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <br />
            <label>
              Contract Sign Date:
              <br />
              <input
                type='text'
                name='contractSignDate'
                value={NewProject.contractSignDate}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />
            <label>
              Contract Total:
              <br />
              <input
                type='text'
                name='contractTotal'
                value={NewProject.contractTotal}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Deposit:
              <br />
              <input
                type='text'
                name='deposit'
                value={NewProject.deposit}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Design / Engineering Fee:
              <br />
              <input
                type='text'
                name='designEngFee'
                value={NewProject.designEngFee}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />

            <label>
              Street Address:
              <br />
              <input
                type='text'
                name='jobsiteAddress'
                value={NewProject.jobsiteAddress}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Suite:
              <br />
              <input
                type='text'
                name='jobsiteSuite'
                value={NewProject.jobsiteSuite}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              City:
              <br />
              <input
                type='text'
                name='jobsiteCity'
                value={NewProject.jobsiteCity}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />
            <label>
              County:
              <br />
              <input
                type='text'
                name='jobsiteCounty'
                value={NewProject.jobsiteCounty}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />
            <br />
            <label>
              Project Notes:
              <br />
              <textarea
                rows='4'
                cols='50'
                type='text'
                name='openingNotes'
                value={NewProject.openingNotes}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
