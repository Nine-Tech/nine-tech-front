import React from "react";
import ProgressBar from "@/components/BarraProgresso";

function CardsProjeto({ id, nome, porcentagem }) {
  return (
    <div className="col-lg-12 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title font-weight-bold me-5">Id: {id}</h5>
            <h5 className="card-title font-weight-bold">Projeto: {nome}</h5>
          </div>
          <ProgressBar progress={porcentagem} />
        </div>
      </div>
    </div>
  );
}

export default CardsProjeto;
