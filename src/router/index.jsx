import App from "../templates/App";

import Home from "../pages/Engenheiro/Home";
import Usuarios from "../pages/Engenheiro/Usuarios";
import Projeto from "../pages/Engenheiro/Projeto";
import Pacote from "../pages/Engenheiro/Pacote";
import Subpacote from "../pages/Engenheiro/Subpacote";
import HomeLider from "../pages/Lider/HomeLider";
import PacoteLider from "../pages/Lider/PacoteLider";

import Login from "../pages/Login";

import { Navigate } from "react-router-dom";

export default [
  {
    path: "/engenheirochefe",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "usuarios",
        element: <Usuarios />,
        handle: { title: "Usuários" },
      },
      {
        path: "projetos/:id",
        element: <Projeto />,
        handle: { title: "Projetos" },
      },
      {
        path: "projetos/:id/pacotes/:pacoteId",
        element: <Pacote />,
        handle: { title: "Pacotes" },
      },
      {
        path: "projetos/:id/pacotes/:pacoteId/subpacotes/:subpacoteId",
        element: <Subpacote />,
        handle: { title: "Subpacotes" },
      },
    ],
  },
  {
    path: "/liderprojeto/:id",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomeLider />,
      },
      {
        path: "subpacotes/:id",
        element: <PacoteLider />,
        handle: { title: "Subpacotes" },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to={"/engenheirochefe"} replace={true} />,
  },
];
