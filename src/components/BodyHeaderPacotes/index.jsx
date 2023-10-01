import { useState } from "react";
import logo from "@/assets/images/9tech-logo.png";
import "./style.scss";

const BodyHeaderPacotes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // const openSuccessModal = () => {
  //   setShowSuccessModal(true);
  // };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    window.axios
      .post("/upload", formData)
      .then((response) => {
        console.log("Arquivo enviado com sucesso!", response);
      })
      .catch((error) => {
        console.error("Erro ao enviar arquivo:", error);
      });
  };

  const addDocument = () => {
    var input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", function () {
      const file = input.files[0];
      if (file) {
        const fileType = file.type;
        if (
          fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          setSelectedFile(file);
        } else {
          alert("Por favor, selecione um arquivo Excel (.xlsx).");
        }
      }
    });

    input.click();
  };

  const handleContinueClick = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
    } else {
      alert("Por favor, selecione um arquivo antes de continuar.");
    }
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-body d-flex align-items-center">
          <h3 className="card-title fw-bold p-2 flex-grow-1">
            Pacotes de Trabalho
          </h3>
          <button type="button" className="btn btn-warning" onClick={openModal}>
            {" "}
            Importar Tabela Excel
            {/* <button type="button" className="btn btn-warning" onClick={addDocument}> */}
          </button>
        </div>
        <hr />
      </div>

      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <div className="logoModal text-center w-100">
                <img src={logo} alt="9tech-logo" />
              </div>
              <button
                type="button"
                className="btn-close float-end"
                onClick={closeModal}
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>Faça upload do arquivo Excel (.xlsx):</p>
              <button
                type="button"
                className="btn btn-secondary m-3"
                onClick={addDocument}
              >
                Selecione um arquivo (.xlsx)
              </button>
              {selectedFile && (
                <h5>Arquivo selecionado: {selectedFile.name}</h5>
              )}
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleContinueClick}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>

      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        style={{ display: showSuccessModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Importação Concluída com Sucesso! :)
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeSuccessModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>Sua importação foi concluída com sucesso!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={closeSuccessModal}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyHeaderPacotes;
