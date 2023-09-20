import { Link } from "react-router-dom";
import "./style.scss";

const BodyHeaderCronograma = () => {
  return (
    <>
      <div className="card shadow">
        <div className="card-body d-flex align-items-center">
          <h3 className="card-title fw-bold p-2 flex-grow-1">
            Pacotes de Trabalho
          </h3>
        </div>
        <hr />
        <ul className="nav nav-tabs d-flex">
          <li className="nav-item">
            <Link className="nav-link" to={"pacotes"}>
              Divisão
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to={"cronograma"}
            >
              Cronograma
            </Link>
          </li>

          <p className="ms-auto m-2">Responsável: Líder de Projeto 1</p>
        </ul>
      </div>
    </>
  );
};

export default BodyHeaderCronograma;
