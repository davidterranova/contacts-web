import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Moment from 'moment';

import { Contact } from './Contact';

function ContactItemClass(props : { contact: Contact, onDeleteClick: any, onEditClick: any }) {

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this contact?") === true) {
      props.onDeleteClick(props.contact);
    }
  }

  const handleEditClick = () => {
    props.onEditClick(props.contact);
  }

  return (
    <Col>
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{props.contact.first_name} {props.contact.last_name}</Card.Title>
          <Card.Text>
            <span>ID: </span>{props.contact.id}
            <br />
            <span>Email: </span>{props.contact.email}
            <br />
            <span>Phone: </span>{props.contact.phone}
            <br />
            <span>Updated at: </span>{Moment(props.contact.updated_at).format()}
          </Card.Text>
          <InputGroup>
            <Button variant="outline-secondary" onClick={handleEditClick}>Edit</Button>
            <Button variant="outline-danger" onClick={handleDeleteClick}>Delete</Button>
          </InputGroup>
        </Card.Body>
      </Card>
    </Col>
  )
}

export { ContactItemClass };
