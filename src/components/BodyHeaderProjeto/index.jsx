import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

function BodyHeaderProjeto({ projectId, onDeleteProject }) {
  const [projectName, setProjectName] = useState("Nome do projeto");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState("");

  const handleEditClick = () => {
    setEditedProjectName(projectName);
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    onDeleteProject(projectId);
    setShowDeleteModal(false);
  };

  const handleEditSave = () => {
    setProjectName(editedProjectName);
    setShowEditModal(false);
  };

  return (
    <div>
      <div className="card shadow">
        <div className="card-body d-flex align-items-center">
          <div className="project-square"></div>
          <div>
            <h6 className="card-subtitle mb-2 text-muted">Projeto</h6>
            <h3 className="card-title fw-bold">
              {projectName}
            </h3>
          </div>
          <div className="ms-auto">
            <button type="button" className="edit-button" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button type="button" className="delete-button" onClick={handleDeleteClick}>
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
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-content">
            <button className="close-button" onClick={handleModalClose}>
              x
            </button>
            <p>Tem certeza que deseja excluir o projeto?</p>
            <button className="btn btn-danger" onClick={handleDeleteConfirm}>Confirmar Exclusão</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-container">
          <div className="modal-content">
            <button className="close-button" onClick={handleModalClose}>
              x
            </button>
            <h5>Editar nome do projeto</h5>
            <input
              type="text"
              className="edit-input"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
            />
            <button className="save-button" onClick={handleEditSave}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BodyHeaderProjeto;
