import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { title } = props;

  const navigate = useNavigate();

  const voltar = () => {
      window.history.back();
  };

  return (
    <div className="header d-flex align-items-center justify-content-between my-4 col-lg-12">
      <h2>{title}</h2>
      <div className="d-flex align-items-center">
        <span className="font-size-20">Voltar</span>
        <button className="btn btn-secondary ms-3" onClick={voltar}>
          <i className="fa fa-right-from-bracket" />
        </button>
      </div>
    </div>
  );
};

export default Header;