import { Outlet, useParams, useLocation } from "react-router";
import "./style.scss";

import { useMatches } from "react-router-dom";
import Header from "@/components/Header";
import Navbar from "../../components/Navbar/Index";

const App = () => {
  const matches = useMatches();
  const title = matches.slice(-1)[0]?.handle?.title || "Home";

  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const user = pathParts[1];
  const id = pathParts[2];

  let userTitle = "";

  if (user === "engenheirochefe") {
    userTitle = "Engenheiro Chefe";
  } else if (user === "liderprojeto" && id) {
    userTitle = `Lider de Projeto ${id}`;
  }

  return (
    <>
      <Navbar />
      <div className="app">

        <Header title={title} userTitle={userTitle} />

        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
