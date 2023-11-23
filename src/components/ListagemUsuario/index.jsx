import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import "./style.scss";

const ListagemUsuarios = ({ usuarios: propUsuarios, onEditUser }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [toast, setToast] = useState(false);
  const [modalData, setModalData] = useState({
    showModal: false,
    userIdToDelete: null,
    userToDelete: null,
  });
  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    // Atualizar o estado local quando a prop 'usuarios' for alterada
    setUsuarios(propUsuarios);
  }, [propUsuarios]);

  const handleEdit = (id) => {
    console.log(`Editar usuário com ID ${id}`);
    onEditUser && onEditUser(id);
  };

  const handleDelete = (id, nome) => {
    setModalData({
      showModal: true,
      userIdToDelete: id,
      userToDelete: nome,
    });
    setDeleteStatus(null); // Resetar o status ao abrir o modal
  };

  const cancelDelete = () => {
    setModalData({
      showModal: false,
      userIdToDelete: null,
      userToDelete: null,
    });
    setDeleteStatus(null); // Resetar o status ao cancelar
  };

  const confirmDelete = async (id) => {
    try {
      // Realizar a solicitação DELETE
      const response = await window.axios.delete(`auth/${id}`);

      console.log(`Excluído usuário com ID ${id}`);
      console.log(response.data);

      // Atualizar o status para sucesso
      setDeleteStatus("success");

      // Feche o modal após a exclusão ou faça outras ações necessárias
      setModalData({
        showModal: true,
        userIdToDelete: null,
        userToDelete: null,
      });

      // Atualizar a lista de usuários após a exclusão, se necessário
      const updatedUsers = usuarios.filter((usuario) => usuario.id !== id);
      setUsuarios(updatedUsers);
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);

      setModalData({
        showModal: true,
        userIdToDelete: null,
        userToDelete: null,
      });

      // Atualizar o status para falha
      setDeleteStatus("fail");
    }
  };

  const modalContent =
    deleteStatus === "success" ? (
      <p>Usuário excluído com sucesso!</p>
    ) : deleteStatus === "fail" ? (
      <p>Falha ao excluir o usuário. Tente novamente mais tarde.</p>
    ) : (
      <>
        <p className="confirmation-message">
          Deseja realmente excluir este usuário?
        </p>
        <div className="user-details">
          <p>
            <b>ID: </b>
            {modalData.userIdToDelete}
          </p>
          <p>
            <b>Nome: </b>
            {modalData.userToDelete}
          </p>
        </div>
      </>
    );

  return (
    <div>
      <Toast show={toast} toggle={setToast} />
      <h2 className="mt-3">Lideres de Projeto:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="col-1">{usuario.id}</td>
              <td className="col-8">{usuario.nome}</td>
              <td className="col-3">
                {/* Ícone de Editar */}
                <i
                  className="fa fa-edit text-primary pointer me-4"
                  onClick={() => handleEdit(usuario.id)}
                />

                {/* Ícone de Excluir */}
                <i
                  className="fa fa-trash text-danger pointer"
                  onClick={() => handleDelete(usuario.id, usuario.nome)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        showModal={modalData.showModal}
        handler={cancelDelete}
        header={() => (
          <h5>
            {deleteStatus === "success"
              ? "Exclusão Bem-sucedida"
              : deleteStatus === "fail"
              ? "Exclusão Falhou"
              : "Confirmação de Exclusão"}
          </h5>
        )}
        footer={() => (
          <>
            {deleteStatus !== "success" && deleteStatus !== "fail" && (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(modalData.userIdToDelete)}
                >
                  Excluir
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancelar
                </button>
              </>
            )}
          </>
        )}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default ListagemUsuarios;
