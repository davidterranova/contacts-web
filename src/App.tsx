import React from 'react';
import './App.css';
import ContactList from './contacts/ContactList';
import { NavContact } from './navbar';
import { Container } from 'react-bootstrap';

import { User } from "./users/User";

function App() {
  const [user, setUser] = React.useState(new User());

  const setCurrentUser = (user:User) => {
    setUser(user);
  }

  return (
    <>
      <Container as="main">
        <NavContact user={user} setCurrentUser={setCurrentUser}/>
        <ContactList user={user}/>
      </Container>
    </>
  );
}

export {App} ;
