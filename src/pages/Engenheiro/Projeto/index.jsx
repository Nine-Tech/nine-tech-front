import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaCronograma from "@/components/TabelaCronograma";
import Dashboard from "../../../components/Dashboard/Dashboard";
import LiderSelect from "../../../components/LiderSelect/LiderSelect";
import { GraficoProjeto } from "../../../components/GraficoCurvaS/GraficoProjeto";

const Projeto = () => {
  const { id, itemId } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);
  const [cronograma, setCronograma] = useState({});
  const [idProjeto, setIdProjeto] = useState(0);

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
      />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="atribuicao" role="tabpanel">
          <LiderSelect data={packages} />
        </div>
        <div className="tab-pane" id="dashboard" role="tabpanel">
          <Dashboard data={packages} />
        </div>
        <div className="tab-pane" id="cronograma" role="tabpanel">
          <TabelaCronograma data={cronograma} idProjeto={idProjeto} dataInicio={project.data_inicio} dataFinal={project.data_final} />
        </div>
        <div className="tab-pane" id="grafico" role="tabpanel">
          <GraficoProjeto />
        </div>
      </div>
    </>
  );
};

export default Projeto;
