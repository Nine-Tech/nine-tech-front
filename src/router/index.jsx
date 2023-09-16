import Pacotes from "../pages/Pacotes/Pacotes";
import App from "../templates/App";
import Projetos from "../pages/Projetos/Projetos";

import Home from "../pages/Home";

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
        element: <div>Tarefas</div>,
        handle: { title: "Tarefas" },
      },
    ],
  },
];
