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
            className="nav-link d-flex align-items-center"
            onClick={logout}
          >
            <h5 className="fs-5 fw-bold">SAIR</h5>
            <i className="fa fa-right-from-bracket ms-2 fa-2x" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
