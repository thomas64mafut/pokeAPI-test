import React from 'react';
import './header.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ControlLogin from '../controlLogin/ControlLogin';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className='p-0 m-0'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" className='Header_pokelogo' />
            </Navbar.Brand>
          <Nav className="me-auto">
            <div className='Header_buttonContainer'>
              {/* <Link to='login'>
                <Button variant= 'secondary'>login</Button>
              </Link> */}
              <Link to='home'>
                <Button variant= 'danger'>Captura un Pokemon</Button>
              </Link>
            </div>
            <ControlLogin />
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
