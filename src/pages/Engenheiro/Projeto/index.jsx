import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaWbs from "@/components/TabelaWbs";
import TabelaCronograma from "@/components/TabelaCronograma";
import Dashboard from "../../../components/Dashboard/Dashboard";
import LiderSelect from "../../../components/LiderSelect/LiderSelect";

const Projeto = () => {
  const { id, itemId } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);
  const [cronograma, setCronograma] = useState({});

  useEffect(() => {
    window.axios.get(`projeto/${id}`).then(({ data }) => {
      setProject(data);
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
  ];

  return (
    <>
      <BodyHeader title={project.nome || "Projeto"} navigation={navigation} />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="atribuicao" role="tabpanel">
          <LiderSelect data={packages} />
        </div>
        <div className="tab-pane" id="dashboard" role="tabpanel">
          <Dashboard data={packages} />
        </div>
        <div className="tab-pane" id="cronograma" role="tabpanel">
          <TabelaCronograma data={cronograma} />
        </div>
      </div>
    </>
  );
};

export default Projeto;