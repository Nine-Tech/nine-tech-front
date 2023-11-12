import logo from "@/assets/images/9tech-logo.png";
import logo2 from "@/assets/images/9tech_black_transparent.png";
import { Link } from "react-router-dom";
import { removeToken } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Navbar = (props) => {
  const { user, userTitle, children } = props;

  const { id, roles } = user;
  const route = (roles || []).includes("ROLE_ENGENHEIRO_CHEFE")
    ? "/engenheirochefe"
    : `/liderprojeto/${id}`;

  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  let navbarClass =
    "navbar shadow border-4 border-bottom border-dark bg-body-danger";

  if (roles && roles.includes("ROLE_ENGENHEIRO_CHEFE")) {
    navbarClass += " navbar-engenheiro";
  }

  let logoSrc = (roles || []).includes("ROLE_ENGENHEIRO_CHEFE") ? logo2 : logo;

  return (
    <>
      <nav className={navbarClass}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand ms-2" href={route}>
            <img src={logoSrc} alt="9tech-logo" width="90"></img>
          </a>
          <div className="d-flex ms-auto me-4">
            <span className=" fs-5 fw-bold">{userTitle}</span>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link  fw-bold"
                  aria-current="page"
                  href={route}
                >
                  Home
                </a>
              </li>
              {children}

              <li className="btn-group dropend">
                <a
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Usuários
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="#">
                      Cadastrar
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Listar
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Excluir
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <button
            type="button"
            class="btn btn-outline-dark align-items-center fw-bold"
            onClick={logout}
          >
            SAIR
            <i className="fa fa-right-from-bracket ms-2" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
