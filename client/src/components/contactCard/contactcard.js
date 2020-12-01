import React from 'react';
import './contactcard.css';
import { Link } from 'react-router-dom';

export default function contactCard(props) {
  const contactData = props.contact;
  return (
    <>
      {/* used the link instead of an anchor tag (which i had initially) so i could send data to the page instead of making another call to the api */}
      <Link
        id='contactCard'
        to={{
          pathname: '/contactProfile',
          state: contactData,
        }}
      >
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
      </Link>
    </>
  );
}
