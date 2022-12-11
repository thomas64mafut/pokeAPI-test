import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const RegisterModal = (props) => {
  const {
    show,
    setShow,
    handleInput,
    handleSubmit,
  } = props;

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          Registro
        </Modal.Header>
        <Modal.Body>
          <Form className='d-flex align-items-center flex-column' onSubmit={handleSubmit}>
            <Form.Group className='mb-3 w-100'>
              <Form.Label>Ingrese su nombre de usuario</Form.Label>
              <Form.Control 
                name='name' 
                type='text' 
                placeholder='usuario123'
                onChange={e => handleInput(e)}
              />
            </Form.Group>
            
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

            <Button 
              variant='primary' 
              type='submit' 
              className='w-25 mb-3'
            >
              Completar Registro 
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RegisterModal
