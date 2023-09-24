import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaCronograma from "@/components/TabelaCronograma";
import LiderTabelaWBE from "../../components/LiderTabelaWBE";

const ProjetoLider = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    window.axios.get(`projeto/listar/${id}`).then(({ data }) => {
      setProject(data);
    });

    window.axios.get(`upload/listarWBS/${id}`).then(({ data }) => {
      setPackages(data);
    });
  }, [id]);

  const navigation = [    
    { link: "#cronograma", title: "Cronograma" },
    { link: "#tabelawbe", title: "Tabela WBE" },
    { link: "#gantt", title: "Gantt" },
    { link: "#avancoprojeto", title: "Avanço Projeto" },
  ];

  return (
    <>
      <BodyHeader title={project.nome || "Projeto"} navigation={navigation} />
      <div className="my-5 tab-content">        
        <div className="tab-pane active" id="cronograma" role="tabpanel">
          <TabelaCronograma data={packages} />
        </div>
        <div className="tab-pane" id="tabelawbe" role="tabpanel">
          <LiderTabelaWBE data={packages} />
        </div>
      </div>
    </>
  );
};

export default ProjetoLider;