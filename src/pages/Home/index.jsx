import { useEffect, useState } from "react";
import BodyHeader from "@/components/BodyHeader";
import Modal from "@/components/Modal";

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
        .post("/upload/criarWBS", formData)
        .then(() => setInputResult("success"))
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
                onClick={() => setShowModal(false)}
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

  useEffect(() => {
    window.axios.get("projeto/listar").then(({ data }) => {
      setProjects(data);
    });
  }, []);

  return (
    <>
      <Modal showModal={showModal} handler={setShowModal}>
        <ModalContent />
      </Modal>

      <BodyHeader title={"Pacotes"} className="mb-5">
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
        <div className="text-center p-5">
          Por favor, clique no botão acima para importar seu arquivo Excel com
          os pacotes de trabalho. Após a importação, eles serão exibidos aqui.
        </div>
      ) : (
        <div>card de projeto</div>
      )}
    </>
  );
};

export default Home;
