import React from "react";

const ProgressBar = ({ progress }) => {
  const progressArredondado =
    progress !== null && progress !== undefined ? progress.toFixed(2) : 0;

  const formatoNumero = new Intl.NumberFormat("pt-BR").format(
    progressArredondado,
  );

  return (
    <>
      {progress !== null && progress !== undefined && (
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
      )}
    </>
  );
};

export default ProgressBar;
