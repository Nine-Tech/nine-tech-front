import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router";
import { useNavigate } from "react-router-dom";
import { removeToken } from "@/utils/api";
import Navbar from "../../components/Navbar/Index";
import Header from "@/components/Header";
import ImportExcel from "../../components/ImportExcel";

const App = () => {
  const location = useLocation();
  const matches = useMatches();
  const title = matches.slice(-1)[0]?.handle?.title || "Home";
  const userIdFromURL = location.pathname.split("/").pop(); // Obtenha o último segmento da URL
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  const checkAccess = async () => {
    try {
      const response = await window.axios.get("auth/informacaoUsuario");
      const data = response.data;

      if (!data) {
        removeToken();
        navigate("/login");
      } else if (
        data.id === userIdFromURL ||
        data.roles.includes("ROLE_ENGENHEIRO_CHEFE")
      ) {
        setUser(data);
      } else if (
        data.roles.includes("ROLE_LIDER_DE_PROJETO_1", "LIDER_DE_PROJETO_2")
      ) {
        const segments = location.pathname.split("/");

        if (segments[1] === "liderprojeto" && segments[2] === data.id) {
          setUser(data);
        } else if (segments[1] === "subpacote" && segments.length === 4) {
          const subpacoteId = segments[3];
          const subpacotesResponse = await window.axios.get(
            `/subpacotes/${subpacoteId}`,
          );
          const subpacoteData = subpacotesResponse.data;

          if (subpacoteData.liderDeProjeto.id === data.id) {
            setUser(data);
          } else {
            navigate(`/liderprojeto/${data.id}`);
          }
        } else {
          navigate(`/liderprojeto/${data.id}`);
        }
      }
    } catch (error) {
      removeToken();
      navigate("/login");
      alert("Erro ao acessar informações do usuário. Faça login novamente.");
    }
  };

  const onImportSuccess = () => {
    // Atualize os projetos após a importação bem-sucedida
    getProjects();
    // Feche o modal
    setShowModal(false);
  };

  const getProjects = () => {
    window.axios.get("projeto").then(({ data }) => {
      // Atualize o estado dos projetos
      setProjects(data);
    });
  };

  useEffect(() => {
    checkAccess();
  }, [location.pathname, userIdFromURL]);

  return (
    <>
      <Navbar user={user} userTitle={user.nome}>
        <li className="nav-item">
          <a
            className="nav-link fw-bold"
            href="#"
            onClick={() => setShowModal(true)}
          >
            Importar Tabela Excel
          </a>
        </li>
        <ImportExcel
          showModal={showModal}
          setShowModal={setShowModal}
          getProjects={getProjects}
          onImportSuccess={onImportSuccess}
        />
      </Navbar>

      <div className="app">
        <Header title={title} user={user} />

        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
