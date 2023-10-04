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
        path: "projetos/:id",
        element: <ProjetoLider />,
        handle: { title: "Projetos" },
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
