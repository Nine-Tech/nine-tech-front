import { useNavigate } from "react-router-dom";
import { removeToken } from "@/utils/api";

const Header = (props) => {
  const { title, userTitle } = props;

  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="header d-flex align-items-center justify-content-between my-4 col-lg-12">
      <h2>{title}</h2>
      <div className="d-flex align-items-center">
        <span className="font-size-20">{userTitle}</span>
        <button className="btn btn-secondary ms-3" onClick={logout}>
          <i className="fa fa-right-from-bracket" />
        </button>
      </div>
    </div>
  );
};

export default Header;
