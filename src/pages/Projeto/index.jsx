import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaWbs from "@/components/TabelaWbs";

const Projeto = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    window.axios.get(`upload/listarWBS/${id}`).then(({ data }) => {
      setProject(data.projeto);
      setPackages(data);
    });
  }, [id]);

  const navigation = [
    { link: "", title: "Divisão" },
    { link: "", title: "Cronograma" },
  ];

  return (
    <>
      <BodyHeader title={project.nome || "Projeto"} navigation={navigation} />
      <div className="my-5">
        <TabelaWbs data={packages} />
      </div>
    </>
  );
};

export default Projeto;
