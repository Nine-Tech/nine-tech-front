import logo from "@/assets/images/9tech-logo.png";
import { Link } from "react-router-dom";
import { removeToken } from "@/utils/api";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <nav className="navbar shadow  navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand" href={route}>
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
                <Link
                  className="nav-link active fs-5 fw-bold"
                  aria-current="page"
                  to={route}
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <span className="font-size-20">{userTitle}</span>
            <button className="btn btn-secondary ms-3" onClick={logout}>
              <i className="fa fa-right-from-bracket" />
            </button>
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
