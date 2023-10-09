import React from "react";
import logo from "@/assets/images/9tech-logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const buttons = () => {
    let options = [
      { link: "", name: "Home", icon: "" },
      // { link: "pacotes", name: "Pacotes", icon: "" },
      // { link: "projetos", name: "Projetos", icon: "" },
      // { link: "tarefas", name: "Tarefas", icon: "" },
    ];
    return options.map((opt) => (
      <Link to={opt.link} classNameName="btn text-start py-3" key={opt.name}>
        <i classNameName={opt.icon} />
        <span>{opt.name}</span>
      </Link>
    ));
  };

  return (
    <>
      <nav className="navbar shadow  navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="9tech-logo" width="90"></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active fs-5 fw-bold"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

/*  <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img src={logo} alt="9tech-logo" width="90"></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div classNameName="collapse navbar-collapse">{buttons()}</div>
            </nav> */
