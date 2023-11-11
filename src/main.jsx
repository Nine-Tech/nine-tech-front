import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router";
import "@/assets/scss/app.scss";
import "bootstrap";
import "./utils/api";

const router = createBrowserRouter(routes);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root"),
);
