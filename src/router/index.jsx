import App from "../templates/App";

import Home from "../pages/Home";
import Projeto from "@/pages/Projeto";
import HomeLider from "../pages/HomeLider";
import ProjetoLider from "../pages/ProjetoLider";

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
        path: "projetos/:id",
        element: <Projeto />,
        handle: { title: "Projetos" },
      },
      {
        path: "projetos/:id/pacotes/:pacoteId",
        element: <Projeto />,
        handle: { title: "Pacotes" },
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
        element: <ProjetoLider />,
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
