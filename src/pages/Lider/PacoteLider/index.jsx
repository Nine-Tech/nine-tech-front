import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TarefaLider from "../../../components/TarefaLider/TarefaLider";
import CronogramaLider from "../../../components/CronogramaLider/CronogramaLider";

const PacoteLider = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [packages, setPackages] = useState([]);
  const [subpackages, setSubpackages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [reload, setReload] = useState(false);
  const [cronograma, setCronograma] = useState({});
  const [idProjeto, setIdProjeto] = useState(0);

  useEffect(() => {
    window.axios.get(`tarefas/subpacote/${id}`).then(({ data }) => {
      setTasks(data);
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
    window.axios.get(`subpacotes/listaIdSubpacote/${id}`).then(({ data }) => {
      setSubpackages(data);
      setProgress(data.porcentagem);
      console.log("PORCENTAGEM: ", data.porcentagem);
      setIdProjeto(data.pacotes.projeto.id);
      if (reload) {
        setReload(false);
      }
    });
  }, [id, reload]);

  const navigation = [
    { link: "#atividades", title: "Atividades" },
    { link: "#planejamento", title: "Planejamento" },
  ];

  const updateProgress = (reload) => {
    setReload(reload);
    console.log("fui chamado com sucesso");
  };

  const updateCronograma = () => {
    window.axios
      .get(`cronograma/${id}`)
      .then(({ data }) => {
        setCronograma(data);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <>
      <BodyHeader
        title={subpackages.nome}
        navigation={navigation}
        progress={progress}
      />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="atividades" role="tabpanel">
          <TarefaLider data={tasks} updateProgress={updateProgress} />
        </div>
        <div className="tab-pane" id="planejamento" role="tabpanel">
          {" "}
          <CronogramaLider
            key={reload}
            data={cronograma}
            idProjeto={idProjeto}
            updateCronograma={updateCronograma}
          />
        </div>
      </div>
    </>
  );
};

export default PacoteLider;
