import { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { LoginModal } from './users/login/LoginModal';

import { User } from './users/User';
import { Container } from "react-bootstrap";

function NavContact(props: { user: User, setCurrentUser: any}) {
  const [show, setShow] = useState(false);

  const showSignInModal = () => {
    setShow(true);
  }

  const handleSignInModal = (user:User) => {
    setShow(!show);
    props.setCurrentUser(user);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Contact List</Navbar.Brand>
          <Nav className="mr-auto">
            {! props.user.isAuthenticated ? <Button variant="primary" onClick={showSignInModal}>Sign in</Button> : <Logout user={props.user} setCurrentUser={props.setCurrentUser}/> }
          </Nav>
        </Container>
      </Navbar>
      <LoginModal show={show} trigger={handleSignInModal}/>
    </>
  )
}

function Logout(props : { user: User, setCurrentUser: any }) {

  const handleLogout = () => {
    props.setCurrentUser(new User());
    console.log("logout");
  }

  return (
    <Dropdown className="justify-content-end">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Signed in as: { props.user.username }
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={handleLogout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { NavContact };
