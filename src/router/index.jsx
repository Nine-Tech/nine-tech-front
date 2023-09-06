import App from "../templates/App";

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
