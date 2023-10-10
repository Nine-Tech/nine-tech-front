import { Outlet } from "react-router";
import "./style.scss";

import { useMatches } from "react-router-dom";
import Header from "@/components/Header";
import Navbar from "../../components/Navbar/Index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getToken, removeToken } from "@/utils/api";

const App = () => {
  const matches = useMatches();
  const title = matches.slice(-1)[0]?.handle?.title || "Home";

  const token = getToken();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    if (!token) {
      removeToken();
      navigate("/login");
    } else {
      window.axios
        .get(`auth/informacaoUsuario`)
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          removeToken();
          navigate("/login");
        });
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar />
      <div className="app">
        <Header title={title} userTitle={user.nome} />

        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
