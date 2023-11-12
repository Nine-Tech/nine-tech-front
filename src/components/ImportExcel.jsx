import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";

const ImportExcel = ({ showModal, setShowModal, onImportSuccess }) => {
  const [projects, setProjects] = useState([]);

  const ModalContent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputResult, setInputResult] = useState(null);
    const [hhValue, setHhValue] = useState(0);
    const [dataTermino, setDataTermino] = useState("");

    const uploadFile = () => {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("dataTermino", dataTermino);
      formData.append("hhValue", hhValue);

      console.log(formData);

      window.axios
        .post("/upload", formData)
        .then(({ data }) => {
          setInputResult("success");
          onImportSuccess();
        })
        .catch(() => setInputResult("error"));
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

    const content = () => {
      switch (inputResult) {
        case "success":
          return (
            <>
              <span className="mb-2">Importação Concluída com Sucesso :)</span>
              <button
                className="btn btn-primary mt-5"
                onClick={() => {
                  getProjects();
                  setShowModal(false);
                }}
              >
                Continuar
              </button>
            </>
          );
        case "error":
          return (
            <>
              <span className="mb-2">
                Ops! Algo deu errado :( Por favor, verifique seu arquivo Excel.
              </span>
              <button
                className="btn btn-primary mt-5"
                onClick={() => setInputResult(null)}
              >
                Voltar
              </button>
            </>
          );
        default:
          return (
            <>
              <span className="mb-2">
                <h4>Upload arquivo Excel</h4>
              </span>
              <button
                type="button"
                className="btn btn-secondary my-1 mb-3"
                onClick={addDocument}
              >
                Selecione um arquivo (.xlsx)
              </button>
              {selectedFile && (
                <>
                  <h5 className="mt-2">Arquivo selecionado:</h5>
                  <p>{selectedFile.name}</p>
                </>
              )}
              <hr className="border border-secondary border-2 opacity-75" />

              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  Valor HH
                </span>
                <input
                  type="number"
                  className="form-control text-center"
                  placeholder={hhValue}
                  aria-label="valor hh"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setHhValue(e.target.value)}
                />
              </div>
              <div className="input-group my-2">
                <span className="input-group-text" id="basic-addon1">
                  Data Término
                </span>
                <input
                  type="date"
                  className="form-control text-center"
                  placeholder={hhValue}
                  aria-label="valor hh"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setDataTermino(e.target.value)}
                />
              </div>
              <hr className="border border-secondary border-2 opacity-75" />

              <button
                className="btn btn-primary mt-3 fw-bold shadow"
                onClick={uploadFile}
              >
                Continuar
              </button>
            </>
          );
      }
    };

    return (
      <div className="d-flex flex-column justify-content-center text-center mx-5 pb-4">
        {content()}
      </div>
    );
  };

  const getProjects = () => {
    window.axios.get("projeto").then(({ data }) => {
      setProjects(data);
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <Modal showModal={showModal} handler={setShowModal}>
        <ModalContent />
      </Modal>
    </div>
  );
};

export default ImportExcel;
