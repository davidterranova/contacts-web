import { useState, useEffect, useMemo } from "react";
// import { MOCK_CONTACTS } from "./MockContacts";

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { ContactItemClass } from "./ContactItem";
import { ContactModal } from "./ContactModal";

import { Contact } from "./Contact";
import { User } from "../users/User";

import { ContactsAPIV1 } from "./ContactAPI";

function ContactList(props: {user:User}) {
  const [contacts, setContacts] = useState(Array<Contact>());
  const [showContactModal, setShowContactModal] = useState(false);
  const [contact, setContact] = useState(new Contact());
  const contactsAPI = useMemo(() => new ContactsAPIV1(), []);

  useEffect(() => {
    if (! props.user.isAuthenticated) {
      setContacts([]);
      return;
    }

    contactsAPI.listContacts(props.user).then((data:any) => {
      setContacts(sortContactList(data));
    }).catch((error) => {
      console.error("Error fetching contacts: " + error.message);
      setContacts([]);
      return;
    });
  }, [props.user, contactsAPI]);

  const handleDelete = (deletedContact: Contact) => {
    contactsAPI.deleteContact(props.user, deletedContact).then(() => {
      const newContactList = contacts.filter((contact) => contact.id !== deletedContact.id);
      setContacts(newContactList);
    }).catch((error) => {
      return false;
    });

    return true;
  }

  const handleShowContactModal = (contact:Contact = new Contact()) => {
    setShowContactModal(true);
    setContact(contact);
  }

  const handleCloseContactModal = (shouldUpdate:Boolean, contact: Contact) => {
    const isNew = contact.id === undefined;
    if (!shouldUpdate) {
      setShowContactModal(false);
      return;
    }

    const method = isNew ? contactsAPI.createContact : contactsAPI.updateContact;
    method(props.user, contact).then((persistedContact:Contact) => {
      if (isNew) {
        setContacts(sortContactList([...contacts, persistedContact]));
      } else {
        const newContactList = contacts.map((contact) => {
          if (contact.id === persistedContact.id) {
            return persistedContact;
          }
          return contact;
        });
        setContacts(sortContactList(newContactList));
      }
    }).catch((error) => {
      return false;
    });
    
    setShowContactModal(false);
  }

  const sortContactList = (list: Array<Contact>) => {
    return list.sort((a:Contact, b:Contact) => {
      return a.last_name.toLowerCase() < b.last_name.toLowerCase() ? -1 : 1;
    });
  }

  if (! props.user.isAuthenticated) {
    return (
      <h1>Please sign in</h1>
    )
  }
  else if (contacts.length === 0) {
    return (
      <>
        <h1>No contacts for now <Button variant="primary" onClick={() => {handleShowContactModal()}}>New Contact</Button></h1>
        <ContactModal
          show={showContactModal} 
          submit={handleCloseContactModal}
          contact={contact}
        />
      </>
    )
  } else {
    return (
      <>
        <h1>My contacts <Button variant="primary" onClick={() => {handleShowContactModal()}}>New Contact</Button></h1>
        <Row>
          {
            contacts.map((contact) => (
              <ContactItemClass key={contact.id} contact={contact} onDeleteClick={handleDelete} onEditClick={handleShowContactModal} />
            ))
          }
        </Row>
        <ContactModal
          show={showContactModal} 
          submit={handleCloseContactModal}
          contact={contact}
        />
      </>
    )
  }
}

export default ContactList;
