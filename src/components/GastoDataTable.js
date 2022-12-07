import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const GastoDataTable = () => {

  const navigate = useNavigate();
  const baseURL = "https://gastos-rest.onrender.com/";
  const [gastos, setGastos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = gastos.slice(firstPostIndex, lastPostIndex);

  const setGastosData = () => {
    axios.get(baseURL + "api/tutorials").then((response) => {
      setGastos(response.data);
    }).catch(error => {
      console.log("Error Ocurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setGastosData();
  }, []);

  const removeGasto = (id) => {
    axios.delete(baseURL + "api/tutorials/" + id).then((response) => {
      setGastosData();
      navigate('/read')

    }).catch(error => {
      console.log("Error borrando gasto:" + error);
    });
  }

  let pages = [];

  for (let i = 1; i <= Math.ceil(gastos.length / postsPerPage); i++) {
    pages.push(i);
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
                currentPosts.map((gasto, index) => (                  
                  <tr key={index}>
                    <td>{gasto.tituloGasto}</td>
                    <td>${gasto.cantidad}</td>
                    <td style={{ width: '1px', whiteSpace: 'nowrap' }}>{gasto.fecha}</td>
                    <td>{gasto.establecimiento}</td>
                    <td>{gasto.comentario}</td>
                    <td >
                      <button
                        onClick={() => removeGasto(gasto.id)} className="button"
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
      <div className='pagination'>
          {pages.map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={page == currentPage ? "active" : ""}>
                {page}
              </button>
            );
          })}
        </div>
    </div>
  );
}
export default GastoDataTable;