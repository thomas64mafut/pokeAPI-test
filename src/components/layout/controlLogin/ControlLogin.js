import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

const ControlLogin = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  const [usersData, setUsersData] = useState([
    {
      username: 'admin',
      email: 'admin@mail.com',
      password: 'admin',
    },
  ])
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(usersData);
  }, [usersData])

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    
    setUser({...user, [key]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsersData(current => [...current, user]);
  }

  const toggleRegisterModal = () => {
    setLoginModalShow(false);
    setRegisterModalShow(true);
  }
  
  return (
    <div>
      <Button variant='success' onClick={() => setLoginModalShow(true)}>Login</Button>

      <LoginModal 
        show={loginModalShow}
        setShow={setLoginModalShow}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        toggleRegisterModal={toggleRegisterModal}
      />

      <RegisterModal 
        show={registerModalShow}
        setShow={setRegisterModalShow}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default ControlLogin
