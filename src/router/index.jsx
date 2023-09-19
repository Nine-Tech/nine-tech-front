
import TabelaWbs from "../components/TabelaWbs";
import Pacotes from "../pages/Pacotes/Pacotes";
import App from "../templates/App";
import Projetos from "../pages/Projetos/Projetos";
import Cronograma from "../pages/Cronograma/Cronograma";

import Home from "../pages/Home";
import Tarefas from "../pages/Tarefas/Tarefas";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "pacotes",
        element: <Pacotes />,
        handle: { title: "Pacotes" },
      },
      {
        path: "projetos",
        element: <Projetos />,
        handle: { title: "Projetos" },
      },
      {
        path: "tarefas",
        element: <Tarefas />,
        handle: { title: "Tarefas" },
      },
      {
        path: "cronograma",
        element: <Cronograma />,
        handle: { title: "Pacotes" },
      },
    ],
  },
];
