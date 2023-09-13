import { Outlet } from "react-router";
import "./style.scss";

import { useMatches } from "react-router-dom";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import logo from "@/assets/images/9tech-logo.png";
import BodyHeaderProjeto from "../../components/BodyHeaderProjeto";

const App = () => {
  const matches = useMatches();
  const title = matches.slice(-1)[0]?.handle?.title || "Home";

  return (
    <>
      <div className="app">
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="9tech-logo" />
        </div>
        <Header title={title} />
        <Sidebar />
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
      <div>
        <BodyHeaderProjeto />
      </div>
    </>
  );
};

export default App;
