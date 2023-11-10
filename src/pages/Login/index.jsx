import cardlogo from "@/assets/images/9tech-logo.png";
import { useNavigate } from "react-router-dom";
import Toast from "@/components/Toast";

import { setToken } from "@/utils/api";
import { useState, useEffect } from "react";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();

  const [senha, setSenha] = useState("");
  const [selectedLogin, setSelectedLogin] = useState("");

  const [toast, setToast] = useState(false);

  const [listaEngenheiros, setListaEngenheiros] = useState({});
  const [listaLideres, setListaLideres] = useState({});

  useEffect(() => {
    window.axios.get(`lider`).then(({ data }) => {
      setListaLideres(data);
    });

    window.axios.get(`engenheiro`).then(({ data }) => {
      setListaEngenheiros(data);
    });
  }, []);

  async function fazerLogin() {
    const loginData = {
      login: selectedLogin,
      senha,
    };

    try {
      const response = await window.axios.post("auth/login", loginData);
      const { token } = response.data;
      setToken(token);

      const userInfoResponse = await window.axios.get("auth/informacaoUsuario");
      const data = userInfoResponse.data;

      let route = data.roles.includes("ROLE_ENGENHEIRO_CHEFE")
        ? "/engenheirochefe"
        : `/liderprojeto/${data.id}`;
      navigate(route);
    } catch (error) {
      setToast(true);
    }
  }

  const pressionarEnter = (event) => {
    if (event.key === "Enter") {
      fazerLogin();
    }
  };

  return (
    <div className="login">
      <Toast show={toast} toggle={setToast}>
        Usuário ou senha incorretos.
      </Toast>

      <div className="login-card">
        <img src={cardlogo} alt="9tech-logo" />
        {/* <h4 className="fw-bold">Log In</h4> */}
        <div className="mt-3 w-100">
          <select
            value={selectedLogin}
            className="form-control"
            onChange={(e) => setSelectedLogin(e.target.value)}
          >
            <option value="">Escolha um login</option>
            {Object.keys(listaLideres).map((liderId) => (
              <option key={liderId} value={listaLideres[liderId].login}>
                {listaLideres[liderId].nome}
              </option>
            ))}
            {Object.keys(listaEngenheiros).map((engenheiroId) => (
              <option
                key={engenheiroId}
                value={listaEngenheiros[engenheiroId].login}
              >
                {listaEngenheiros[engenheiroId].nome}
              </option>
            ))}
          </select>
          <input
            type="password"
            value={senha}
            placeholder="Senha"
            className="form-control mt-4"
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={pressionarEnter}
          />
          <button
            className="btn fw-bold w-100 py-2 btn-primary mt-3 mb-2"
            onClick={fazerLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
