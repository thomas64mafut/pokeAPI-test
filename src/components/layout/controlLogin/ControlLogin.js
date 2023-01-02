import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

const ControlLogin = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const userLogged = localStorage.getItem('loggedUser'); 
    if (userLogged) navigate('/pokemon');
  }, [])

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    
    setUser({...user, [key]: value});
  }

  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('http://localhost:4000/api/user/register', user);
      if (data.message === 'usuario creado correctamente') {
        localStorage.setItem('loggedUser', data?.token);
        setUser({});
        setRegisterModalShow(false);
        navigate('/pokemon');
      }
    } catch (error) {
      setError(
        error?.response?.data?.message 
        || error?.response?.data?.errors[0].msg 
        || 'algo salio mal'
      );
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('http://localhost:4000/api/user/auth', user);
      if (data.message === 'logueo exitoso'){
        localStorage.setItem('loggedUser', data?.token);
        setUser({});
        setLoginModalShow(false);
        navigate('/pokemon');
      }
    } catch (error) {
      setError(
        error?.response?.data?.message 
        || error?.response?.data?.errors[0].msg 
        || 'algo salio mal'
      );
      setTimeout(() => {
        setError('');
      }, 5000);
    }
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
        handleSubmit={handleSubmitLogin}
        toggleRegisterModal={toggleRegisterModal}
        error={error}
      />

      <RegisterModal 
        show={registerModalShow}
        setShow={setRegisterModalShow}
        handleInput={handleInput}
        handleSubmit={handleSubmitRegister}
        error={error}
      />
    </div>
  )
}

export default ControlLogin
