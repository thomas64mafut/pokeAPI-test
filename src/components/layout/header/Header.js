import React, { useEffect, useState } from 'react';
import './header.css';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  let navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState({})

  useEffect(() => {
   const tokenLogged = localStorage.getItem('loggedUser'); 
    if (tokenLogged) {
      setIsLogged(true);
      handleGetUserData(tokenLogged);
    } else {
      setIsLogged(false);
      setLoggedUser({});
    }
  }, [navigate])

  const handleLogOut = () => {
    localStorage.removeItem('loggedUser');
    setIsLogged(false);
    navigate('/')
  }
  
  const handleGetUserData = async (token) => {
    try {
      if (loggedUser?.name) return;
      const { data } = await axios.get('http://localhost:4000/api/user', { headers: { Authorization: token }}) 
      setLoggedUser(data);
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" className='p-0 m-0'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" className='Header_pokelogo' />
            </Navbar.Brand>
        </Container>
        {
          isLogged && 
          <div className='w-100 d-flex text-white'>
            <div className='mx-3 pt-2'>
              Bienvenido {loggedUser.name}
            </div>
            <Button 
              variant='danger' 
              onClick={handleLogOut}
            >
              Log out
            </Button>
          </div>
        }
      </Navbar>
    </>
  )
}

export default Header
