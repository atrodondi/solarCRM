import React, { useState, useEffect } from 'react';
import API from '../../util/API';
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
    materialFee: '',
    installFee: '',
    finalFee: '',
    jobsiteAddress: '',
    jobsiteSuite: '',
    jobsiteCity: '',
    jobsiteZipcode: '',
    jobsiteCounty: '',
    inverters: [],
    modules: [],
    buis: [],
    openingNotes: '',
  });

  // handle change of input value of add project form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((state) => ({ ...state, [name]: value }));
  };

  //   GET CLientS when component mounts
  useEffect(() => {
    props.getClients();
  }, []);

  //handle submit function for add project form
  const handleSubmit = (event) => {
    event.preventDefault();
    let project = {
      client: NewProject.client,
      contractSignDate: NewProject.contractSignDate,
      contractTotal: parseInt(NewProject.contractTotal),
      deposit: parseInt(NewProject.deposit),
      designEngFee: parseInt(NewProject.designEngFee),
      materialFee: parseInt(NewProject.materialFee),
      installFee: parseInt(NewProject.installFee),
      finalFee: parseInt(NewProject.finalFee),
      jobsiteAddress: NewProject.jobsiteAddress,
      jobsiteSuite: NewProject.jobsiteSuite,
      jobsiteCity: NewProject.jobsiteCity,
      jobsiteZipcode: NewProject.jobsiteZipcode,
      jobsiteCounty: NewProject.jobsiteCounty,
    };
    if (
      parseInt(NewProject.contractTotal) !==
      parseInt(NewProject.deposit) +
        parseInt(NewProject.designEngFee) +
        parseInt(NewProject.materialFee) +
        parseInt(NewProject.installFee) +
        parseInt(NewProject.finalFee)
    ) {
      alert(
        '**Please Check contract total or fee totals - totals do not match**'
      );
    } else {
      console.log('project', project);
      // call api from here to add the project
      API.addNewProject(project).then((result) => {
        console.log(result.data);
        let project;
        // result is a user because the project is made then added to the user's active projects list and returns the user. if the length of active projects is 1, then use it b/c its the only one, else grab the last one, as that is the one we just pushed in and created.
        if (result.data.activeProjects.length === 1) {
          project = result.data.activeProjects[0];
          console.log('this is the first active project', project);
        } else if (result.data.activeProjects.length > 1) {
          project =
            result.data.activeProjects[result.data.activeProjects.length - 1];
          console.log('this is the most recent active project', project);
        }

        // new note to be added to project note DB
        let newNote = {
          note: NewProject.openingNotes,
          project: project,
        };
        console.log(newNote);
        // API. add a new project note but only if there is a note to be added
        if (newNote.note !== '') {
          API.addProjNote(newNote).then((result) => {
            console.log('new project note result', result);
          });
        }
      });
    }
    // end of handleSubmit function
  };

  //render
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
                <option>...</option>
                {props.clients.map((contact) => (
                  <option
                    key={contact._id}
                    id={contact._id}
                    value={contact._id}
                  >
                    {contact.lastName + ', ' + contact.firstName}
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
            <label>
              Material Fee:
              <br />
              <input
                type='text'
                name='materialFee'
                value={NewProject.materialFee}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Installation Fee:
              <br />
              <input
                type='text'
                name='installFee'
                value={NewProject.installFee}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Final Fee:
              <br />
              <input
                type='text'
                name='finalFee'
                value={NewProject.finalFee}
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <br />
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
            <label>
              Zipcode:
              <br />
              <input
                type='text'
                name='jobsiteZipcode'
                value={NewProject.jobsiteZipcode}
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
              Opening Notes:
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
            <input type='submit' value='Submit' onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
