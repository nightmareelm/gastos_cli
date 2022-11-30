import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const EmployeeDataTable = () => {

  const navigate = useNavigate();
  const baseURL = "https://gastos-api.onrender.com/";
  const [employees, setEmployees] = useState([]);

  const setEmployeeData = () => {
    axios.get(baseURL + "api/tutorials").then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.log("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setEmployeeData();
  }, []);


  const removeEmployee = (id) => {
    axios.delete(baseURL + "api/tutorials/" + id).then((response) => {
      setEmployeeData();
      navigate('/read')

    }).catch(error => {
      console.log("Error borrando gasto:" + error);
    });
  }

  return (
    <div className="card-body">

      <div className="col-md-12">
        <h2 className="display-6 text-center mb-4">Lista de compras</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th>Gasto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Establecimiento</th>
                <th>Comentario</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                employees &&
                employees.map((employee, index) => (
                  <tr>
                    <td>{employee.tituloGasto}</td>
                    <td>${employee.cantidad}</td>
                    <td>{employee.fecha}</td>
                    <td>{employee.establecimiento}</td>
                    <td>{employee.comentario}</td>
                    <td >
                      <button
                        onClick={() => removeEmployee(employee.id)} className="button"
                      > <img src={deleteIcon} alt="Remove" title="Remove" width="30" height="30" />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
export default EmployeeDataTable;