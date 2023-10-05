import React from "react";

function CardsProjeto({ nome }) {
  return (
    <div className="col-lg-12 col-md-6 col-sm-12 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">{nome}</h5>
          <div className="progress" style={{ marginTop: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "0%" /* variável aqui */ }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <span className="small mt-2">{/* Variavel aqui */}0%</span>
        </div>
      </div>
    </div>
  );
}
export default CardsProjeto;
