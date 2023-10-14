import { Outlet, useLocation } from "react-router";
import "./style.scss";
import { useMatches } from "react-router-dom";
import Header from "@/components/Header";
import Navbar from "../../components/Navbar/Index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeToken } from "@/utils/api";

const App = () => {
  const matches = useMatches();
  const title = matches.slice(-1)[0]?.handle?.title || "Home";
  const location = useLocation();
  const userIdFromURL = location.pathname.split("/").pop(); // Obtenha o último segmento da URL

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await window.axios.get("auth/informacaoUsuario");
        const data = response.data;

        if (!data) {
          removeToken();
          navigate("/login");
        } else if (data.id === userIdFromURL) {
          setUser(data);
        } else if (data.roles.includes("ROLE_ENGENHEIRO_CHEFE")) {
          // O usuário é um Engenheiro Chefe, então permita o acesso a tudo
          setUser(data);
        } else if (
          data.roles.includes("ROLE_LIDER_DE_PROJETO_1", "LIDER_DE_PROJETO_2")
        ) {
          // O usuário é um Líder de Projeto
          const segments = location.pathname.split("/");

          if (segments[1] === "liderprojeto" && segments[2] === data.id) {
            // O Líder de Projeto tem permissão para acessar a página principal do Líder de Projeto
            setUser(data);
          } else if (segments[1] === "subpacote" && segments.length === 4) {
            const subpacoteId = segments[3];

            // Faça uma solicitação para verificar se o subpacote pertence ao Líder de Projeto
            const subpacotesResponse = await window.axios.get(
              `/subpacotes/${subpacoteId}`,
            );
            const subpacoteData = subpacotesResponse.data;

            if (subpacoteData.liderDeProjeto.id === data.id) {
              // O Líder de Projeto tem permissão para acessar o subpacote
              setUser(data);
            } else {
              // O Líder de Projeto não tem permissão, redirecione para a página principal do Líder de Projeto
              navigate(`/liderprojeto/${data.id}`);
            }
          } else {
            // Redirecione para a página principal do Líder de Projeto
            navigate(`/liderprojeto/${data.id}`);
          }
        }
      } catch (error) {
        removeToken();
        navigate("/login");
        alert("Erro ao acessar informações do usuário. Faça login novamente.");
      }
    };

    checkAccess();
  }, [location.pathname, navigate, userIdFromURL]);

  return (
    <>
      <Navbar user={user} />
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
