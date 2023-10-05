import BodyHeader from "@/components/BodyHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
// import BodyHeaderHome from "@/components/BodyHeaderHome";
import CardsProjeto from "@/components/CardsProjeto";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const ModalContent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputResult, setInputResult] = useState(null);

    const uploadFile = () => {
      const formData = new FormData();
      formData.append("file", selectedFile);

      window.axios
        .post("/upload", formData)
        .then(({ data }) => {
          window.axios.post("/cronograma", {
            projeto: { id: data[0]?.projeto?.id },
            porcentagens: Array(data.length).fill(Array(12).fill(0)),
          });
          setInputResult("success");
        })
>>>>>>> 40a6a1e52a27e2aea183967008acedbf6a64f0a6
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
                Faça upload do arquivo Excel (.xlsx):
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addDocument}
              >
                Selecione um arquivo (.xlsx)
              </button>
              {selectedFile && (
                <h5>Arquivo selecionado: {selectedFile.name}</h5>
              )}
              <button className="btn btn-primary mt-5" onClick={uploadFile}>
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
                <CardsProjeto nome={p.nome} />
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
