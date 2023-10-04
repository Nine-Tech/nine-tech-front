import logo from "@/assets/images/9tech-logo.png";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  async function login() {
    setForm({});
    console.log("login efetuado");
    return navigate("/engenheirochefe");
  }

  return (
    <div className="login">
      <img src={logo} alt="9tech-logo" />

      <div className="login-card">
        <h4>Log In</h4>
        <div className="mt-5 w-100">
          <select className="form-select" value={form.grupo}>
            <option value="">Selecione o grupo de trabalho</option>
          </select>
          <input
            type="password"
            value={form.senha}
            placeholder="Senha"
            className="form-control mt-4"
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
