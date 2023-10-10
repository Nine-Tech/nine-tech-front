import logo from "@/assets/images/9tech-logo.png";
import { useNavigate } from "react-router-dom";
import Toast from "@/components/Toast";

import { setToken } from "@/utils/api";
import { useState } from "react";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const [toast, setToast] = useState(false);

  async function login() {
    window.axios
      .post(`auth/login`, { nome, senha })
      .then(({ data: { token } }) => {
        setToken(token);
        window.axios
          .get(`auth/informacaoUsuario`)
          .then(({ data }) => {
            let route = data.roles.includes("ROLE_ENGENHEIRO_CHEFE")
              ? "/engenheirochefe"
              : `/liderprojeto/${data.id}`;
            navigate(route);
          })
          .catch(() => {
            setToast(true);
          });
      })
      .catch(() => {
        setToast(true);
      });
  }

  return (
    <div className="login">
      <Toast show={toast} toggle={setToast}>
        Usuário ou senha incorretos.
      </Toast>

      <img src={logo} alt="9tech-logo" />

      <div className="login-card">
        <h4>Log In</h4>
        <div className="mt-5 w-100">
          <input
            value={nome}
            placeholder="Nome"
            className="form-control"
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="password"
            value={senha}
            placeholder="Senha"
            className="form-control mt-4"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            className="btn w-100 py-2 btn-primary mt-5 mb-3"
            onClick={login}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
