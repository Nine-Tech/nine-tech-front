import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TarefaLider from "../../../components/TarefaLider/TarefaLider";
import CronogramaLider from "../../../components/CronogramaLider/CronogramaLider";
import TabelaValorLider from "../../../components/TabelaValorLIder/TabelaValorLider";
import TarefasView from "@/components/TarefasView/TarefasView";

const PacoteLider = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [packages, setPackages] = useState([]);
  const [subpackages, setSubpackages] = useState([]);
  const [cronograma, setCronograma] = useState({});
  const [idProjeto, setIdProjeto] = useState(0);

  useEffect(() => {
    window.axios.get(`tarefas/subpacote/${id}`).then(({ data }) => {
      setTasks(data);
    });
    window.axios.get(`subpacotes/listaIdSubpacote/${id}`).then(({ data }) => {
      setSubpackages(data);
      setIdProjeto(data.pacotes.projeto.id);
    });
    window.axios.get(`upload/${id}`).then(({ data }) => {
      setPackages(data);
    });

    window.axios
      .get(`cronograma/${id}`)
      .then(({ data }) => {
        setCronograma(data);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, [id]);

  console.log("data do Pacote", cronograma);

  const navigation = [
    { link: "#atividades", title: "Atividades" },
    { link: "#planejamento", title: "Planejamento" },
  ];

  return (
    <>
      <BodyHeader
        title={subpackages.nome}
        navigation={navigation}
        progress={subpackages.porcentagem}
      />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="atividades" role="tabpanel">
          <TarefaLider data={tasks} />
        </div>
        <div className="tab-pane" id="planejamento" role="tabpanel">
          {" "}
          <CronogramaLider data={cronograma} idProjeto={idProjeto} />
        </div>
      </div>
    </>
  );
};

export default PacoteLider;
