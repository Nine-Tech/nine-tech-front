import { useNavigate, useLocation } from "react-router-dom";

const Header = (props) => {
  const { title, user } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = user;

  const homeEngenheiro = [`/engenheirochefe`];
  const homeLiderProjeto = [`/liderprojeto/${id}`];

  const esconderBotaoEngenheiro = homeEngenheiro.includes(location.pathname);
  const esconderBotaoLiderProjeto = homeLiderProjeto.includes(location.pathname);

  const voltar = () => {
    window.history.back();
  };

  return (
    <div className="header d-flex align-items-center justify-content-between my-4 col-lg-12">
      <h2>{title}</h2>
      <div className="d-flex align-items-center">
      {(!(esconderBotaoEngenheiro || esconderBotaoLiderProjeto)) && (
          <button className="btn ms-3 d-flex align-items-center" onClick={voltar}>
            <h5>VOLTAR</h5>
            <i className="fa-solid fa-reply-all ms-2 fa-2x"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;