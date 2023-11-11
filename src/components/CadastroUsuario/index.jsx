import React, { useState } from "react";
import Toast from "@/components/Toast";
import axios from "axios";

function CadastroUsuario() {
  const [usuario, setUsuario] = useState({
    nome: "",
    senha: "",
    login: "",
    role: "LIDER_DE_PROJETO",
  });

  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await window.axios.post("auth/registro", usuario);

      // Se a request for bem-sucedida, exibe o toast de sucesso
      setToast(true);

      // Limpa os campos do formulário
      setUsuario({
        nome: "",
        senha: "",
        login: "",
        role: "LIDER_DE_PROJETO",
      });
    } catch (error) {
      console.error("Erro na requisição:", error);
      // Se houver um erro, você pode exibir um toast de erro ou lidar de outra forma
    }
  };

  return (
    <div>
      <Toast show={toast} toggle={() => setToast(false)} />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="login">Login (E-mail):</label>
          <input
            type="email"
            id="login"
            name="login"
            value={usuario.login}
            onChange={handleChange}
            required
          />
        </div>
        {/* Campo hidden de "role" */}
        <input type="hidden" name="role" value="user" />

        <button type="submit">Cadastrar Usuario</button>
      </form>
    </div>
  );
}

export default CadastroUsuario;
