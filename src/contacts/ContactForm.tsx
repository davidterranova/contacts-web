import { useState } from "react";
import { Contact } from './Contact';
import Form from 'react-bootstrap/Form';

function ContactForm(props: { contact: Contact }) {
  const [contact, ] = useState(props.contact);

  return (
    <>
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" placeholder="Enter contact first name" defaultValue={contact.first_name} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Enter contact last name" defaultValue={contact.last_name} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter contact email" defaultValue={contact.email} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter contact phone number" defaultValue={contact.phone} />
      </Form.Group>
    </>
  );
}

export { ContactForm };
