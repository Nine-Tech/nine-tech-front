import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaWbs from "@/components/TabelaWbs";
import TabelaCronograma from "@/components/TabelaCronograma";
import CardsProjeto from "@/components/CardsProjeto";
import TarefasLiderView from "../../../components/TarefasView/TarefasView";

const Subpacote = () => {
  const { subpacoteId } = useParams();

  const [subpacoteNome, setSubpacoteNome] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    window.axios.get(`subpacotes/listarUmSubpacote/${subpacoteId}`).then(({ data }) => {
      setSubpacoteNome(data);
    });

    window.axios.get(`tarefas/subpacote/${subpacoteId}`).then(({ data }) => {
      setTasks(data);
    });
  }, [subpacoteId]);

  console.log(subpacoteNome)

  const navigation = [{ link: "#divisao", title: "Divisão" }];

  return (
    <>
      <BodyHeader title={subpacoteNome.nome || "Subpacote"} navigation={navigation} />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="divisao" role="tabpanel">
          <TarefasLiderView data={tasks} />
        </div>
      </div>
    </>
  );
};

export default Subpacote;
