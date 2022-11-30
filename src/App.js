import React from 'react';
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeDataTable from './components/EmployeeDataTable';


function App() {

  return (
    <div className="container py-3">
      <header>
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            <span className="fs-4">Gastos Mensuales</span>
          </a>

          <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <ul class="nav nav-pills">
              <li class="nav-item">
              <Link to="/" className="nav-link nav-item" aria-current="page"
                  >Inicio</Link>
              </li>
              <li class="nav-item">
                <Link to="/create" className="nav-link nav-item" aria-current="page"
                  >Crear registro</Link>
              </li>
            </ul>
          </nav>
          
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/read" />} />
        <Route exact path="/create" element={<AddEmployee />} />
        <Route exact path="/read" element={<EmployeeDataTable />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>

    </div>
  );
}

export default App;