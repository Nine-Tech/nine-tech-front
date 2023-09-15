import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

function BodyHeaderProjeto() {
  return (
    <div className="card shadow">
      <div className="card-body d-flex align-items-center">
      <div className="project-square"></div>
        <div>
          <h6 className="card-subtitle mb-2 text-muted">Projeto</h6>
          <h3 className="card-title fw-bold">Nome do projeto</h3>
        </div>
        <div className="ms-auto">
          <button type="button" className="btn btn-warning me-2">
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button type="button" className="btn btn-warning">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <hr />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Tabelas WBE
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Gantt
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Avanço Projeto
          </a>
        </li>
      </ul>
    </div>
  );
}

export default BodyHeaderProjeto;
