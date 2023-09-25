import { Outlet, useParams, useLocation } from "react-router";
import "./style.scss";

import { useMatches } from "react-router-dom";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import logo from "@/assets/images/9tech-logo.png";

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
      <div className="app">
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="9tech-logo" />
        </div>
        <Header title={title} userTitle={userTitle} />
        <Sidebar />
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
