import React, { useState, useEffect } from "react";
import BodyHeader from "@/components/BodyHeader";
import ListagemUsuario from "@/components/ListagemUsuario";
import EditarUsuario from "@/components/EditarUsuario";
import CadastroUsuario from "@/components/CadastroUsuario";

const navigation = [
  { link: "#listar", title: "Listagem" },
  { link: "#cadastrar", title: "Cadastrar" },
  { link: "#editar", title: "Editar" },
];

const Usuarios = () => {
  const [usuarioEditandoId, setUsuarioEditandoId] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.axios.get("auth/lideres");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []); // Este efeito será executado apenas uma vez, no momento da montagem do componente

  const handleEditarUsuario = (id) => {
    // Define o ID do usuário que está sendo editado
    setUsuarioEditandoId(id);

    // Ativa a aba de edição
    document.getElementById("Editar").click();
  };

  const updateUserList = async () => {
    try {
      const response = await window.axios.get("auth/lideres");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <>
      <BodyHeader title={"Usuarios"} navigation={navigation} />
      <div className="my-3 tab-content">
        {/* Listagem de Usuários */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          <ListagemUsuario
            usuarios={usuarios}
            onEditUser={handleEditarUsuario}
            updateUserList={updateUserList}
          />
        </div>

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <CadastroUsuario updateUserList={updateUserList} />
        </div>

        {/* Edição de Usuário */}
        <div className="tab-pane" id="editar" role="tabpanel">
          <EditarUsuario
            usuarioId={usuarioEditandoId}
            updateUserList={updateUserList}
          />
        </div>
      </div>
    </>
  );
};

export default Usuarios;
