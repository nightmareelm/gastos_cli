import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'

const EmployeeForm = () => {
  const baseURL = "https://gastos-rest.onrender.com/api/tutorials/";
  const navigate = useNavigate();
  const [tituloGasto, setTitulo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [establecimiento, setEstab] = useState('');
  const [comentario, setComen] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const gastoChangeHandler = (event) => {
    setTitulo(event.target.value);
  };

  const costoChangeHandler = (event) => {
    setCantidad(event.target.value);
  };

  var today = startDate;
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  var convertedDate = dd + '-' + mm + '-' + yyyy;

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
        fecha: convertedDate,
        establecimiento: establecimiento,
        comentario: comentario
      })
      .then((response) => {
        alert("Gasto " + tituloGasto + " agregado!");
        navigate("/read");
      }).catch(error => {
        alert("error===" + error);
      });
  };

  const cancelHandler = () => {
    //reset the values of input fields
    setTitulo('');
    setCantidad('');
    setFecha('');
    setEstab('');
    setComen('');
    navigate("/read");

  }

  return (
    <div className="row h-100 justify-content-center align-items-center">
      <div class="col-10 col-md-8 col-lg-6">
        <form class="needs-validation" novalidate onSubmit={submitActionHandler}>
          <div class="row g-3">

            <div class="col-sm-6">
              <label for="firstName" class="form-label">Gasto</label>
              <input type="text" class="form-control" value={tituloGasto} onChange={gastoChangeHandler} required />
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Costo</label>
              <input type="text" class="form-control" value={cantidad} onChange={costoChangeHandler} required />
            </div>

            <div class="col-6">
              <label for="email" class="form-label">Fecha</label>
              <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            <div class="col-6">
              <label for="address" class="form-label">Lugar de Compra</label>
              <input type="text" class="form-control" value={establecimiento} onChange={lugarChangeHandler} />
            </div>

            <div class="col-12">
              <label for="address2" class="form-label">Comentarios</label>
              <input type="text" class="form-control" value={comentario} onChange={comentChangeHandler} />
            </div>

            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type='submit' class="btn btn-primary btn-lg px-4">Agregar</button>
              <button ttype='submit' onClick={() => cancelHandler()} class="btn btn-primary btn-lg px-4">Cancelar</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
export default EmployeeForm;