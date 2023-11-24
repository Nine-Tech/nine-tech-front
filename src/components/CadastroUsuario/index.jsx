import React, { useState } from "react";
import Toast from "@/components/Toast";

function CadastroUsuario({ updateUserList }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    senha: "",
    role: "LIDER_DE_PROJETO",
  });

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

      setToastMessage(`Usuário cadastrado com sucesso!`);
      setToast(true);

      // Limpa os campos do formulário
      setUsuario({
        nome: "",
        senha: "",
        role: "LIDER_DE_PROJETO",
      });

      updateUserList();

      document.getElementById("Listagem").click();
    } catch (error) {
      console.error("Erro na requisição:", error);

      // Verifica se o erro é de validação (código 400)
      if (error.response && error.response.status === 400) {
        setToastMessage("Nome já cadastrado!");
      } else {
        // Se for um erro diferente de validação, você pode lidar de outra forma
        setToastMessage("Erro ao processar a requisição.");
      }

      setToast(true);
    }
  };

  return (
    <div className="container mt-2">
      <Toast
        show={toast}
        toggle={() => setToast(false)}
        type={toastMessage.includes("sucesso") ? "success" : "danger"}
      >
        {toastMessage}
      </Toast>

      <div className="card p-4">
        <h2 className="mb-3">Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="nome" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={usuario.nome}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="senha" className="form-label">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={usuario.senha}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/*           <div className="mb-2">
            <label htmlFor="login" className="form-label">
              Login (E-mail):
            </label>
            <input
              type="email"
              id="login"
              name="login"
              value={usuario.login}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div> */}

          {/* Campo hidden de "role" */}
          <input type="hidden" name="role" value="user" />

          <button type="submit" className="btn btn-primary">
            Cadastrar Usuário
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroUsuario;
