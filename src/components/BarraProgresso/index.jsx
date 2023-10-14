import React from "react";

const ProgressBar = ({ progress }) => {
  const formatoNumero =
    progress !== null && progress !== undefined
      ? new Intl.NumberFormat("pt-BR").format(progress)
      : 0;
  return (
    <div className="d-flex align-items-center">
      {formatoNumero}%
      <div className="progress ms-2" style={{ width: "200px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
