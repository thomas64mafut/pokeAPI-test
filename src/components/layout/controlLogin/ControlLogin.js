import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

const ControlLogin = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  const [user, setUser] = useState({});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    
    setUser({...user, [key]: value});
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    // const alreadyRegistered = usersData.find(userFromList => userFromList.email === user.email)

    // if(alreadyRegistered){
    //   alert('Hay un usuario con este correo ya registrado pa')
    // }else {
    //   setUsersData(current => [...current, user]);
    //   setRegisterModalShow(false)
    // }

    const { data } = await axios.post('http://localhost:4000/api/register', user);
    if (data.message === 'usuario creado correctamente') {
      setRegisterModalShow(false);
    }
    alert(data.message);
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    // const userLogin = usersData.find(userFromList => userFromList.email === user.email && userFromList.password === user.password)

    // if(userLogin){
    //   alert('Logueado')
    //   setLoginModalShow(false)
    // }else alert('Datos incorrectos')

    const { data } = await axios.post('http://localhost:4000/api/auth', user);
    if (data.message === 'logueo exitoso'){
      localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser({});
      setLoginModalShow(false);
    }
    alert(data.message);
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
      />

      <RegisterModal 
        show={registerModalShow}
        setShow={setRegisterModalShow}
        handleInput={handleInput}
        handleSubmit={handleSubmitRegister}
      />
    </div>
  )
}

export default ControlLogin
