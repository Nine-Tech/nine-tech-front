import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaCronograma from "@/components/TabelaCronograma";
import LiderTabelaWBE from "../../components/LiderTabelaWBE";
import Tarefas from "../../components/Tarefas/Tarefas";

const ProjetoLider = () => {
  const { id, idDoLider } = useParams();
  const [task, setTask] = useState({});
  const [packages, setPackages] = useState([]);
  const [subPackages, setSubPackages] = useState([]);
  const [cronograma, setCronograma] = useState({});

  useEffect(() => {
    window.axios.get(`tarefas/subpacote/${id}`).then(({ data }) => {
      setTask(data);
    });

    window.axios.get(`subpacotes/${idDoLider}`).then(({ data }) => {
      setSubPackages(data);
    });

    window.axios.get(`upload/${id}`).then(({ data }) => {
      setPackages(data);
    });

    window.axios.get(`cronograma/${id}`).then(({ data }) => {
      setCronograma(data);
    });
  }, [id], [idDoLider]);

  const navigation = [
    { link: "#tarefas", title: "Tarefas" },
    { link: "#cronograma", title: "Cronograma" },
    { link: "#tabelawbe", title: "Tabela WBE" },
    { link: "#gantt", title: "Gantt" },
    { link: "#avancoprojeto", title: "Avanço Projeto" },
  ];

  const subPackage = subPackages.find(subPackage => subPackage.id === parseInt(id));
  const subPackageTitle = subPackage ? subPackage.nome : "Subpacote";

  return (
    <>
      <BodyHeader title={subPackageTitle} navigation={navigation} />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="tarfas" role="tabpanel">
          <Tarefas data={task} />
        </div>
        <div className="tab-pane" id="cronograma" role="tabpanel">
          <TabelaCronograma data={cronograma} />
        </div>
        <div className="tab-pane" id="tabelawbe" role="tabpanel">
          <LiderTabelaWBE data={packages} />
        </div>
      </div>
    </>
  );
};

export default ProjetoLider;
