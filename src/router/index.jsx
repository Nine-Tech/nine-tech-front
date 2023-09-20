import App from "../templates/App";

import Home from "../pages/Home";
import Projeto from "@/pages/Projeto";

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
        element: <Home />,
      },
      {
        path: "projetos/:id",
        element: <Projeto />,
        handle: { title: "Projetos" },
      },
    ],
  },
];
