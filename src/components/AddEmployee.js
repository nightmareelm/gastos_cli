import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EmployeeForm = () => {
  const baseURL = "https://gastos-api.onrender.com/api/tutorials";
  const navigate = useNavigate();
  const [tituloGasto, setTitulo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [establecimiento, setEstab] = useState('');
  const [comentario, setComen] = useState('');

  const gastoChangeHandler = (event) => {
    setTitulo(event.target.value);
  };

  const costoChangeHandler = (event) => {
    setCantidad(event.target.value);
  };

  const fechaChangeHandler = (event) => {
    setFecha(event.target.value);
  };

  const lugarChangeHandler = (event) => {
    setEstab(event.target.value);
  };

  const comentChangeHandler = (event) => {
    setComen(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .post(baseURL, {
        tituloGasto: tituloGasto,
        cantidad: cantidad,
        fecha: fecha,
        establecimiento: establecimiento,
        comentario: comentario
      })
      .then((response) => {
        alert("Gasto "+ tituloGasto +" agregado!");
        navigate("/read");
      }).catch(error => {
        alert("error==="+error);
      });
  };

  const cancelHandler = () =>{
    //reset the values of input fields
    setTitulo('');
    setCantidad('');
    setFecha('');
    setEstab('');
    setComen('');
    navigate("/read");

  }
    return(
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler}>

        <Form.Group controlId="form.Name">
            <Form.Label>Gasto</Form.Label>
            <Form.Control type="text" value={tituloGasto} onChange={gastoChangeHandler} placeholder="Escribe el gasto" required/>
        </Form.Group>

        <Form.Group  controlId="form.Role">
            <Form.Label>Costo</Form.Label>
            <Form.Control type="text" value={cantidad} onChange={costoChangeHandler} placeholder="Escribe el costo" required/>
        </Form.Group>

        <Form.Group  controlId="form.Role">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="text" value={fecha} onChange={fechaChangeHandler} placeholder="Escribe la fecha" required/>
        </Form.Group>

        <Form.Group  controlId="form.Role">
            <Form.Label>Lugar de Compra</Form.Label>
            <Form.Control type="text" value={establecimiento} onChange={lugarChangeHandler} placeholder="Escribe el lugar" required/>
        </Form.Group>

        <Form.Group  controlId="form.Role">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control type="text" value={comentario} onChange={comentChangeHandler} placeholder="Escribe un comentario" required/>
        </Form.Group>

        <br></br>
        <Button type='submit'>Agregar gasto</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>

    </Container>
    </Alert>

    );
}
export default EmployeeForm;