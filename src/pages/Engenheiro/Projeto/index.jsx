import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaCronograma from "@/components/TabelaCronograma";
import Dashboard from "../../../components/Dashboard/Dashboard";
import LiderSelect from "../../../components/LiderSelect/LiderSelect";
import { GraficoProjeto } from "../../../components/GraficoCurvaS/GraficoProjeto";
import Modal from "@/components/Modal";

const Projeto = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);
  const [cronograma, setCronograma] = useState({});
  const [idProjeto, setIdProjeto] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [novaDataFinal, setNovaDataFinal] = useState("");

  useEffect(() => {
    window.axios.get(`projeto/${id}`).then(({ data }) => {
      setProject(data);
      console.log("PROJETO DATA", data);
    });

    window.axios.get(`upload/${id}`).then(({ data }) => {
      setPackages(data);
    });

    window.axios.get(`cronograma/${id}`).then(({ data }) => {
      setCronograma(data);
    });
  }, [id]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmar = async () => {
    try {
      if (!project.data_inicio) {
        const response = await window.axios.get(`projeto/${id}`);
        const projetoCompleto = response.data;
        setProject(projetoCompleto);
      }

      const dadosAtualizados = {
        nome: project.nome || '',
        data_inicio: project.data_inicio || '',
        data_final: novaDataFinal,
      };

      console.log('Dados Atualizados:', dadosAtualizados);

      const response = await window.axios.put(`projeto/${id}`, dadosAtualizados);

      setProject(response.data);
      console.log('Projeto atualizado:', response.data);

      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar o projeto:', error);
    }
  };

  const navigation = [
    { link: "#atribuicao", title: "Atribuição" },
    { link: "#dashboard", title: "Dashboard" },
    { link: "#cronograma", title: "Cronograma" },
    { link: "#grafico", title: "Gráfico" },
  ];

  return (
    <>
      <BodyHeader
        id={project.id}
        title={project.nome || "Projeto"}
        navigation={navigation}
        porcentagem={project.porcentagem}
        data_inicio={project.data_inicio}
        data_final={project.data_final}
      >
      <div className="mt-5">
        <button className="btn btn-primary shadow" onClick={handleOpenModal}>
          Alterar Data
        </button>
      </div>
      </BodyHeader>
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="atribuicao" role="tabpanel">
          <LiderSelect data={packages} />
        </div>
        <div className="tab-pane" id="dashboard" role="tabpanel">
          <Dashboard data={packages} />
        </div>
        <div className="tab-pane" id="cronograma" role="tabpanel">
          <TabelaCronograma
            data={cronograma}
            idProjeto={idProjeto}
            dataInicio={project.data_inicio}
            dataFinal={project.data_final}
          />
        </div>
        <div className="tab-pane" id="grafico" role="tabpanel">
          <GraficoProjeto />
        </div>
      </div>
      <Modal size="lg" showModal={showModal} handler={handleCloseModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Alterar Data Final do Projeto</h4>
          </div>
          <div className="modal-body">
            <label>
              Insira a nova data final:
              <br />
              <input
                type="date"
                className="form-control"
                value={novaDataFinal}
                onChange={(e) => setNovaDataFinal(e.target.value)}
              />
            </label>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleConfirmar}
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Projeto;
