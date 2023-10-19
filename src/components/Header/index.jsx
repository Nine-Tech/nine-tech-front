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
        <button className="btn ms-3 d-flex align-items-center" onClick={voltar}>
        <h5>VOLTAR</h5>
        <i class="fa-solid fa-reply-all ms-2 fa-2x"></i>
        
                    
        </button>
      </div>
    </div>
  );
};

export default Header;