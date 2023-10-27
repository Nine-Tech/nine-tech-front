import BodyHeader from "@/components/BodyHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import CardsProjeto from "@/components/CardsProjeto";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [hhValue, setHhValue] = useState(0.0);
  const [dataTermino, setDataTermino] = useState("");
  const [latestProjectId, setLatestProjectId] = useState(null);

  const handleSubmitHH = () => {
    const hhValueAsFloat = parseFloat(hhValue);

    const requestData = {
      valor_homem_hora: hhValueAsFloat,
    };

    window.axios
      .put(`/projeto/homem_hora/${latestProjectId}`, requestData)
      .then((response) => {
        handleSubmitDataTermino(); // Chama a função para enviar a Data de Término
      })
      .catch((error) => {
        setInputResult("errorHH");
      });
  };

  const handleSubmitDataTermino = () => {
    setInputResult("successHH");
  };

  const [inputResult, setInputResult] = useState(null);

  const ModalContent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const uploadFile = () => {
      const formData = new FormData();
      formData.append("file", selectedFile);

      window.axios
        .post("/upload", formData)
        .then(({ data }) => {
          const projectId = data[0]?.projeto?.id;
          setLatestProjectId(projectId);
          console.log(projectId)
          window.axios.post("/cronograma", {
            projeto: { id: projectId },
            porcentagens: Array(data.length).fill(Array(12).fill(0)),
          });
          setInputResult("success");
          console.log(inputResult)
        })
        .catch(() => setInputResult("error"));
        console.log(inputResult)
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
              <span className="m-3">
                <b>Importação concluída com sucesso!</b>
              </span>
              <span className="m-1">
                <b>Definições iniciais do projeto: </b>
              </span>
              <label>
                Insira o valor HH (Homem Hora):
                <br />
                <input
                  type="number"
                  value={hhValue}
                  onChange={(e) => setHhValue(e.target.value)}
                />
              </label>
              <label className="my-1">
                Insira a Data de Término:
                <br />
                <input
                  type="date"
                  value={dataTermino}
                  onChange={(e) => setDataTermino(e.target.value)}
                />
              </label>

              <button className="btn btn-primary mt-3" onClick={handleSubmitHH}>
                Continuar
              </button>
            </>
          );
        case "successHH":
          return (
            <>
              <span className="m-2">
                <b>
                  O valor de Homem Hora e a Data Final foram definidos com
                  sucesso! :)
                </b>
              </span>
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  getProjects();
                  setInputResult("default")
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
        case "errorHH":
          return (
            <>
              <span className="mb-2">
                Ops! Não foi possível salvar o valor de HH, tente novamente mais
                tarde!
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
                className="btn btn-secondary m-2"
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
              <button
                type="button"
                className="btn btn-primary m-2"
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
