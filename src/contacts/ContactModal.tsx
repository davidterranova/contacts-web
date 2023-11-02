import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ContactForm } from './ContactForm';

import { Contact } from './Contact';


function ContactModal(props: { contact: Contact, show: boolean, submit: any }) {

  const onClose = () => {
    props.submit(false, new Contact());
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const contact: Contact = new Contact({
      id: props.contact.id,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value
    });

    props.submit(true, contact);
  };

  return (
    <Modal show={props.show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm
            contact={props.contact}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {onClose()}}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export { ContactModal };
