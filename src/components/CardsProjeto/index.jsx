import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "@/components/BarraProgresso";

function formatDataParaExibicao(data) {
  let date = new Date(data);
  date.setDate(date.getDate() + 1)
  return date.toLocaleDateString("pt-BR");
}

function CardsProjeto({ id, nome, porcentagem, data_inicio, data_final }) {
  return (
    <div className="col-12 mb-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h5 className="card-title font-weight-bold">{nome}</h5>
          <ProgressBar progress={porcentagem} />
        </div>
        <div className="card-body m-0">
          <p className="my-0">Id: {id}</p>
          {data_inicio && (
            <p className="my-0">
              Início: {formatDataParaExibicao(data_inicio)}
            </p>
          )}
          {data_final && (
            <p className="my-0">
              Término: {formatDataParaExibicao(data_final)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

CardsProjeto.propTypes = {
  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  porcentagem: PropTypes.number.isRequired,
  data_inicio: PropTypes.string,
  data_final: PropTypes.string,
};

export default CardsProjeto;
