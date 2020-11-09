import React, {useState} from "react";
import "./addContactModal.css";
import API from "../../util/API"

export default function AddContactModal(props) {


// add new contact
const [newContact,setNewContact] = useState({
  firstName:"",
  lastName:"",
  address:"",
  city:"",
  zipcode:"",
  county:"",
  phone:"",
  email:"",
  openingNotes:""
})

// handle change of input value
const handleInputChange = e => {
  const { name, value } = e.target;
  setNewContact(state=>(
    {...state,[name]:value}
  ));
};
// handles the clicking of the submit button on add contact form
const handleSubmit = (event) => {
  event.preventDefault();
  let contact = {
    firstName:newContact.firstName,
    lastName:newContact.lastName,
    addressStreet:newContact.address,
    addressCity: newContact.city,
    addressCounty:newContact.county,
    addressZipcode:newContact.zipcode,
    phone:newContact.phone,
    email: newContact.email
  }
  API.addCustomer(contact).then(result=>{
    console.log(result)
    // need to take the id and now add the opening note as a note and attach it to the new customer
    let newNote = {
      note:newContact.openingNotes,
      customer: result.data.id
    }
  API.addCustNote(newNote).then((result,err)=>{
    if (err){
      console.log(err)
    }
    else {
      console.log(result.data.message )
// clear the content of the state of the modal 
setNewContact(
  {
    firstName:"",
    lastName:"",
    address:"",
    city:"",
    zipcode:"",
    county:"",
    phone:"",
    email:"",
    openingNotes:""
  }
  )
//close the modal
  props.setShowModal(false)
    }
  })
   
  })
  

};



// what to render
  return props.showModal ? (
    <div className="modalWrapper">
      <div className="modal">
        <button className="closeButton" onClick={props.openModal}>&#10006;</button>
        {/*&#10006; is unicode for cool looking x for close button  */}
        <div className="formContainer">
        <form>
        <label>
          First Name:
          <br />
          <input type="text" name="firstName" value={newContact.firstName} autoComplete="off" onChange={handleInputChange}/>
        </label>
        <br />
        <label>
          Last Name:
          <br />
          <input type="text" name="lastName" value={newContact.lastName} autoComplete="off"onChange={handleInputChange} />
        </label>
        <br />
        <br />
        <label>
          Address:
          <br />
          <input type="text" name="address" value={newContact.address} autoComplete="off"onChange={handleInputChange} />
        </label>
        <br />
        <label>
        City:
          <br />
          <input type="text" name="city" value={newContact.city} autoComplete="off" onChange={handleInputChange}/>
        </label>
        <br />
        <label>
        Zipcode:
          <br />
          <input type="text" name="zipcode" value={newContact.Zipcode} autoComplete="off"onChange={handleInputChange} />
        </label>
        <br />
        <label>
        County:
          <br />
          <input type="text" name="county" value={newContact.county} autoComplete="off"onChange={handleInputChange} />
        </label>
        <br />
        <br />
        <label>
        Phone:
          <br />
          <input type="text" name="phone" value={newContact.phone} autoComplete="off"onChange={handleInputChange} />
        </label>
        <br />
        <label>
        Email:
          <br />
          <input type="text" name="email" value={newContact.email} autoComplete="off"onChange={handleInputChange} />
        </label>
        <br />
        <br />
        <br />
        <label>
        Opening Notes:
          <br />
          <textarea rows="4" cols="50"type="text" name="openingNotes" value={newContact.openingNotes} autoComplete="off" onChange={handleInputChange}/>
        </label>
        <br />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      </div>
      </div>
    </div>
  ) : null;
}
