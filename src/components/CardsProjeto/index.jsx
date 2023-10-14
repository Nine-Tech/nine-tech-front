import React from "react";
import ProgressBar from "@/components/BarraProgresso";

function CardsProjeto({ nome, porcentagem }) {
  return (
    <div className="col-lg-12 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">{nome}</h5>
          <ProgressBar progress={porcentagem} />
        </div>
      </div>
    </div>
  );
}

export default CardsProjeto;
