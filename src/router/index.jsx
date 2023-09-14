import App from "../templates/App";

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
        element: <div>Pacotes</div>,
        handle: { title: "Pacotes" },
      },
      {
        path: "projetos",
        element: <div>Projetos</div>,
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
