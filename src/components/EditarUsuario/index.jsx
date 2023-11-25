import React, { useState, useEffect } from "react";
import Toast from "@/components/Toast";
import axios from "axios";

const EditarUsuario = ({ usuarioId, updateUserList }) => {
  const [lider, setLider] = useState({
    id: "",
    nome: "",
    senha: "",
    cpf: "",
    login: "",
    role: "LIDER_DE_PROJETO",
  });
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Verifica se há um ID válido
    if (!usuarioId) {
      setToastMessage("Clique em editar na página de Listagem");
      setToast(true);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `auth/lideres/${parseInt(usuarioId, 10)}`,
        );
        setLider(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
        // Lide com o erro da forma que desejar (ex.: redirecione para uma página de erro)
      }
    };

    fetchData();
  }, [usuarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLider((prevLider) => ({
      ...prevLider,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const { senha, login, cpf, nome } = lider;
    const updateLider = { senha, login, nome, cpf };

    try {
      await axios.put(`auth/atualizar/${usuarioId}`, updateLider);
      updateUserList();

      document.getElementById("Listagem").click();
      setToastMessage("Líder atualizado com sucesso!");
      setToast(true);
    } catch (error) {
      console.error("Erro ao atualizar o líder:", error);
      // Lide com o erro da forma que desejar (ex.: exiba uma mensagem de erro no toast)

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

      {usuarioId ? (
        <div className="card p-4">
          <h2 className="mb-4">Editar Líder</h2>
          <form>
            {/* Nome */}
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={lider.nome}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Senha */}
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                Senha:
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={lider.senha}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="cpf" className="form-label">
                Cpf:
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={lider.cpf}
                onChange={handleChange}
                className="form-control"
                inputMode="numeric"
                maxLength="11"
                required
              />
            </div>

            {/*             <div className="mb-3">
              <label htmlFor="login" className="form-label">
                Login (E-mail):
              </label>
              <input
                type="email"
                id="login"
                name="login"
                value={lider.login}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div> */}

            {/* Campo hidden de "role" */}
            <input type="hidden" name="role" value="user" />

            {/* Botão de Atualizar */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Atualizar Líder
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center">Volte para a página de listagem.</p>
      )}
    </div>
  );
};

export default EditarUsuario;
