import React, { useState, useRef } from "react";
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
  
  const handleEditarUsuario = (id) => {
    // Define o ID do usuário que está sendo editado
    setUsuarioEditandoId(id);

    // Ativa a aba de edição
    document.getElementById("Editar").click();
  };

  return (
    <>
      <BodyHeader title={"Usuarios"} navigation={navigation} />
      <div className="my-3 tab-content">

        {/* Listagem de Usuários */}
        <div className="tab-pane active" id="listar" role="tabpanel">
          <ListagemUsuario onEditUser={handleEditarUsuario} />
        </div>

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <CadastroUsuario />
        </div>

        {/* Edição de Usuário */}
        <div className="tab-pane" id="editar" role="tabpanel">
          <EditarUsuario usuarioId={usuarioEditandoId} />
        </div>
      </div>
    </>
  );
};

export default Usuarios;
