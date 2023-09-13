import App from "../templates/App";
import Projetos from "../pages/Projetos/Projetos";

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <div>Home</div>,
      },
      {
        path: "pacotes",
        element: <div>Pacotes</div>,
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
