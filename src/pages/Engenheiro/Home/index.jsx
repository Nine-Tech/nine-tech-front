import BodyHeader from "@/components/BodyHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import CardsProjeto from "@/components/CardsProjeto";
import ImportExcel from "../../../components/ImportExcel";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    window.axios.get("projeto").then(({ data }) => {
      setProjects(data);
      console.log("Dados");
      console.log(data);
    });
  };

  const onImportSuccess = () => {
    getProjects();
    setShowModal(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  function formatDataParaExibicao(data) {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <>
      <Modal showModal={showModal} handler={setShowModal}>
        <ImportExcel
          showModal={showModal}
          setShowModal={setShowModal}
          getProjects={getProjects}
          onImportSuccess={onImportSuccess}
        />
      </Modal>

      <BodyHeader title={"Projetos"} className="mb-5">
        <div className="d-flex">
          <button
            className="btn btn-primary shadow mb-2"
            onClick={() => setShowModal(true)}
          >
            Importar Tabela Excel
          </button>
        </div>
      </BodyHeader>

      {projects.length ? (
        <div className="row mt-5">
          {projects.map((p) => (
            <div className="col-lg-6" key={p.id}>
              <Link
                to={`projetos/${p.id}`}
                className="text-decoration-none text-primary"
              >
                <CardsProjeto
                  id={p.id}
                  nome={p.nome}
                  porcentagem={p.porcentagem}
                  data_inicio={p.data_inicio}
                  data_final={p.data_final}
                />
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
