import React from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const LoginModal = (props) => {
  const {
    show,
    setShow,
    handleInput,
    handleSubmit,
    toggleRegisterModal,
    error,
  } = props;

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          Iniciar Sesion
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form className='d-flex align-items-center flex-column' onSubmit={handleSubmit}>
            <Form.Group className='mb-3 w-100'>
              <Form.Label>Ingrese su Correo Electronico</Form.Label>
              <Form.Control 
                name='email' 
                type='email' 
                placeholder='ejemplo@mail.com' 
                onChange={e => handleInput(e)}
              />
            </Form.Group>

            <Form.Group className='mb-3 w-100'>
              <Form.Label>Ingrese su Contraseña</Form.Label>
              <Form.Control 
                name='password' 
                type='password' 
                placeholder='contraseña' 
                onChange={e => handleInput(e)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='w-25 mb-3'>
              Iniciar Sesion
            </Button>
            
            <Form.Label className='w-100 text-center'>
              No tenes una cuenta? Registrate!
            </Form.Label>

            <div>
              <Button variant='secondary' onClick={toggleRegisterModal}>
                Registro
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginModal
