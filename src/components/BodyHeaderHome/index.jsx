import React, { useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";



const BodyHeaderHome = () => {  

  return (
    <>
      <div className="card shadow">
        <div className="card-body d-flex align-items-center">
          <h3 className="card-title fw-bold p-2 flex-grow-1">Pacotes de Trabalho</h3>
          <button type="button" className="btn btn-warning me-2">
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button type="button" className="btn btn-warning">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <hr />
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Divisão
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Cronograma
            </a>
          </li>
        </ul>
      </div>     

    </>
  );
};

export default BodyHeaderHome;