import App from "../templates/App";

import Home from "../pages/Home";
import Projeto from "@/pages/Projeto";
import HomeLider from "../pages/HomeLider";
import TabelaCronograma from "../components/TabelaCronograma";
import ProjetoLider from "../pages/ProjetoLider";

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
];
