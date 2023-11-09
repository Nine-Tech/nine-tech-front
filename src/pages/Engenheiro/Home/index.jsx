import BodyHeader from "@/components/BodyHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import CardsProjeto from "@/components/CardsProjeto";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
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

              <div class="input-group my-2">
                <span class="input-group-text" id="basic-addon1">
                  Valor HH
                </span>
                <input
                  type="number"
                  class="form-control text-center"
                  placeholder={hhValue}
                  aria-label="valor hh"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setHhValue(e.target.value)}
                />
              </div>
              <div class="input-group my-2">
                <span class="input-group-text" id="basic-addon1">
                  Data Término
                </span>
                <input
                  type="date"
                  class="form-control text-center"
                  placeholder={hhValue}
                  aria-label="valor hh"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setDataTermino(e.target.value)}
                />
              </div>
              {/* <label>
                Valor HH (Homem Hora):
                <br />
                <input
                  type="number"
                  placeholder={hhValue}
                  className="form-control"
                  onChange={(e) => setHhValue(e.target.value)}
                />
              </label> */}
              {/* <label className="my-1">
                Data de Término:
                <br />
                <input
                  type="date"
                  onChange={(e) => setDataTermino(e.target.value)}
                  className="form-control"
                />
              </label> */}
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

  useEffect(getProjects, []);

  return (
    <>
      <Modal showModal={showModal} handler={setShowModal}>
        <ModalContent />
      </Modal>

      <BodyHeader title={"Projetos"} className="mb-5">
        <div className="d-flex">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Importar Tabela Excel
          </button>
        </div>
      </BodyHeader>

      {projects.length ? (
        <div className="row mt-5">
          {projects.map((p) => (
            <div className="col-lg-4" key={p.id}>
              <Link
                to={`projetos/${p.id}`}
                className="text-decoration-none text-primary"
              >
                <CardsProjeto nome={p.nome} porcentagem={p.porcentagem} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-5">
          Por favor, clique no botão acima para importar seu arquivo Excel com
          os pacotes de trabalho. Após a importação, eles serão exibidos aqui.
        </div>
      )}
    </>
  );
};

export default Home;
