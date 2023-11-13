import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "@/components/BarraProgresso";

function CardsProjeto({ id, nome, porcentagem, data_inicio, data_final }) {
  return (
    <div className="col-12 mb-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h5 className="card-title font-weight-bold">{nome}</h5>
          <ProgressBar progress={porcentagem} />
        </div>
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title font-weight-bold me-5">Id: {id}</h5>
          </div>
          {data_inicio && (
            <h5 className="card-title font-weight-bold">
              Início: {data_inicio}
            </h5>
          )}
          {data_final && (
            <h5 className="card-title font-weight-bold">
              Término: {data_final}
            </h5>
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
