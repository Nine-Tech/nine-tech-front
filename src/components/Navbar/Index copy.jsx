import logo from "@/assets/images/9tech-logo.png";
import logo2 from "@/assets/images/9tech_black_transparent.png";
import { Link } from "react-router-dom";
import { removeToken } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Navbar = (props) => {
  const { user, userTitle } = props;

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
          <a className="navbar-brand" href={route}>
            <img src={logoSrc} alt="9tech-logo" width="90"></img>
          </a>
          <div className="d-flex ms-auto me-2">
            <span className="fs-5 fw-bold">{userTitle}</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <a className="navbar-brand" href={route}>
                  <img src={logoSrc} alt="9tech-logo" width="90"></img>
                </a>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="d-flex mx-3 ">
              <span className="fs-5 fw-bold">{userTitle}</span>
            </div>
            <div className="m-2 border-bottom border-primary border-2" />
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className="nav-link  fs-5 fw-bold"
                    aria-current="page"
                    to={route}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link d-flex align-items-center"
                    onClick={logout}
                  >
                    <h5 className="fs-5 fw-bold">SAIR</h5>
                    <i className="fa fa-right-from-bracket ms-2 fa-2x" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
