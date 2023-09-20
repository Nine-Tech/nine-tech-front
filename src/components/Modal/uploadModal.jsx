import { useState } from "react"; // Importe o React e useState

const UploadModal = () => {
  // Adicione um estado para controlar a exibição do modal
  const [showModal, setShowModal] = useState(false);

  // Função para abrir o modal
  // const openModal = () => {
  //   setShowModal(true);
  // };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="logo d-flex align-items-center">
                {/* <img src={logo} alt="9tech-logo" /> */}
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body align-self-center">
              {/* Conteúdo do modal */}
              <p>Faça upload do arquivo Excel (.xlsx):</p>
              <button
                type="button"
                // className="btn btn-secondary"
                // onClick={addDocument}
              >
                Selecione um arquivo (.xlsx)
              </button>
            </div>
            <div className="modal-footer align-self-center">
              {/*  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Fechar
              </button> */}
              <button type="button" className="btn btn-primary">
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
    </>
  );
};

export default UploadModal;
