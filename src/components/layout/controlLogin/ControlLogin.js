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
    localStorage.setItem('allUsers', JSON.stringify(usersData));
  }, [usersData])

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    
    setUser({...user, [key]: value});
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const alreadyRegistered = usersData.find(userFromList => userFromList.email === user.email)

    if(alreadyRegistered){
      alert('Hay un usuario con este correo ya registrado pa')
    }else {
      setUsersData(current => [...current, user]);
      setRegisterModalShow(false)
    }
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const userLogin = usersData.find(userFromList => userFromList.email === user.email && userFromList.password === user.password)

    if(userLogin){
      alert('Logueado')
      setLoginModalShow(false)
    }else alert('Datos incorrectos')
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
