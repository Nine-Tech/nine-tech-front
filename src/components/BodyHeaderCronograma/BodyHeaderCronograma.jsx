import React, { useState } from "react";
import "./style.scss";



const BodyHeaderCronograma = () => {


  return (
    <>
      <div className="card shadow">
        <div className="card-body d-flex align-items-center">
          <h3 className="card-title fw-bold p-2 flex-grow-1">Pacotes de Trabalho</h3>         
        </div>
        <hr />
        <ul className="nav nav-tabs d-flex">
          <li className="nav-item">
            <a className="nav-link" href="/pacotes">
              Divisão
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/cronograma">
              Cronograma
            </a>
          </li>
          
          <p className="ms-auto m-2">Responsável: Líder de Projeto 1</p>
          
        </ul>
        
      </div>

    </>
  );
};

export default BodyHeaderCronograma;