import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";

const ListagemUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [toast, setToast] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulando uma requisição para obter a lista de usuários
        const response = await window.axios.get("auth/lideres");
        setUsuarios(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Lógica para edição de usuário (redirecionamento para a página de edição, por exemplo)
    console.log(`Editar usuário com ID ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para exclusão de usuário
    console.log(`Excluir usuário com ID ${id}`);
  };

  return (
    <div>
    <Toast show={toast} toggle={setToast} />
      <h2>Lideres de Projeto:</h2>
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
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>
                {/* Ícone de Editar */}
                <i
                  className="fa fa-edit text-primary cursor-pointer"
                  onClick={() => handleEdit(usuario.id)}
                />
                {/* Ícone de Excluir */}
                <i
                  className="fa fa-trash text-danger cursor-pointer ml-2"
                  onClick={() => handleDelete(usuario.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemUsuarios;
