import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TarefasLiderView from "@/components/TarefasView/TarefasView";
import { GraficoSubpacotes } from "../../../components/GraficoCurvaS/GraficoSubpacotes";

const Subpacote = () => {
  const { subpacoteId } = useParams();

  const [subpacoteNome, setSubpacoteNome] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    window.axios
      .get(`subpacotes/listarUmSubpacote/${subpacoteId}`)
      .then(({ data }) => {
        setSubpacoteNome(data);
      });

    window.axios.get(`tarefas/subpacote/${subpacoteId}`).then(({ data }) => {
      setTasks(data);
    });
  }, [subpacoteId]);

  console.log(subpacoteNome);

  const navigation = [
    { link: "#atividade", title: "Atividades" },
    { link: "#grafico", title: "Gráfico" },
  ];

  return (
    <>
      <BodyHeader
        title={subpacoteNome.nome || "Subpacote"}
        navigation={navigation}
      />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="atividade" role="tabpanel">
          <TarefasLiderView data={tasks} />
        </div>
        <div className="tab-pane" id="grafico" role="tabpanel">
          <GraficoSubpacotes />
        </div>
      </div>
    </>
  );
};

export default Subpacote;
