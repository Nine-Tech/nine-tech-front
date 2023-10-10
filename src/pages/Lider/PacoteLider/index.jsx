import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TarefaLider from "../../../components/TarefaLider/TarefaLider";

const PacoteLider = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [packages, setPackages] = useState([]);
  const [subpackages, setSubpackages] = useState([]);  
  const [cronograma, setCronograma] = useState({});

  useEffect(() => {
    window.axios.get(`tarefas/subpacote/${id}`).then(({ data }) => {
      setTasks(data);
    });

    window.axios.get(`subpacotes/listaIdSubpacote/${id}`).then(({ data }) => {
      setSubpackages(data);
    });

    window.axios.get(`upload/${id}`).then(({ data }) => {
      setPackages(data);
    });

    window.axios.get(`cronograma/${id}`).then(({ data }) => {
      setCronograma(data);
    });
  }, [id]);

  const navigation = [
    { link: "#tarefas", title: "Tarefas" },
    
  ];

  return (
    <>
      <BodyHeader title={subpackages.nome} navigation={navigation} />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="tarfas" role="tabpanel">
          <TarefaLider data={tasks} />
        </div>
        
      </div>
    </>
  );
};

export default PacoteLider;
