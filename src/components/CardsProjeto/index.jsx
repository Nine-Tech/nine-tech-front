import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "@/components/BarraProgresso";

function formatDataParaExibicao(data) {
  const date = new Date(data);
  return date.toLocaleDateString("pt-BR");
}

function CardsProjeto({ id, nome, porcentagem, data_inicio, data_final }) {
  return (
    <div className="col-12 mb-4">
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header d-flex justify-content-between">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              <div className="card-header ">
                <h5 className="card-title font-weight-bold">{nome}</h5>
                <ProgressBar progress={porcentagem} />
              </div>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
          >
            <div className="accordion-body">
              <div className="d-flex">
                <h5 className="card-title font-weight-bold me-5">Id: {id}</h5>
              </div>
              {data_inicio && (
                <h5 className="card-title font-weight-bold">
                  Início: {formatDataParaExibicao(data_inicio)}
                </h5>
              )}
              {data_final && (
                <h5 className="card-title font-weight-bold">
                  Término: {formatDataParaExibicao(data_final)}
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-12 mb-4">
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
                Início: {formatDataParaExibicao(data_inicio)}
              </h5>
            )}
            {data_final && (
              <h5 className="card-title font-weight-bold">
                Término: {formatDataParaExibicao(data_final)}
              </h5>
            )}
          </div>
        </div>
      </div> */}
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
