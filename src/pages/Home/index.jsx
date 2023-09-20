import { useEffect, useState } from "react";
import BodyHeader from "@/components/BodyHeader";
import Modal from "@/components/Modal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.axios.get("/upload/listarWBS");
  }, []);

  return (
    <>
      <Modal showModal={showModal} handler={setShowModal} />
      <BodyHeader title={"Pacotes"}>
        <div className="d-flex">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Importar Tabela Excel
          </button>
        </div>
      </BodyHeader>
    </>
  );
};

export default Home;
