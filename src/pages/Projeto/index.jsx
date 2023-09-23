import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaWbs from "@/components/TabelaWbs";
import TabelaCronograma from "@/components/TabelaCronograma";

const Projeto = () => {
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
    { link: "#divisao", title: "Divisão" },
    { link: "#cronograma", title: "Cronograma" },
  ];

  return (
    <>
      <BodyHeader title={project.nome || "Projeto"} navigation={navigation} />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="divisao" role="tabpanel">
          <TabelaWbs data={packages} />
        </div>
        <div className="tab-pane" id="cronograma" role="tabpanel">
          <TabelaCronograma data={packages} />
        </div>
      </div>
    </>
  );
};

export default Projeto;
