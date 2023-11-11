import React from "react";
import BodyHeader from "@/components/BodyHeader";
import ListagemUsuario from "@/components/ListagemUsuario"
import CadastroUsuario from "@/components/CadastroUsuario";

const navigation = [
  { link: "#listagem", title: "Listagem" },
  { link: "#cadastrar", title: "Cadastrar" },
];

const Usuarios = () => {
  return (
    <>
      <BodyHeader title={"Usuarios"} navigation={navigation} />
      <div className="my-3 tab-content">

        {/* Listagem de Usuários */}
        <div className="tab-pane active" id="listagem" role="tabpanel">
          <ListagemUsuario />
        </div>

        {/* Cadastro de Usuário */}
        <div className="tab-pane" id="cadastrar" role="tabpanel">
          <CadastroUsuario />
        </div>
      </div>
    </>
  );
};

export default Usuarios;
