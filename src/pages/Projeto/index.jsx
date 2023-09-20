import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";

const Projeto = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    window.axios.get("projeto/listar").then(({ data }) => {
      let item = data.find((i) => String(i.id) === id);
      setProject(item);
    });

    window.axios.get("upload/listarWBS").then(({ data }) => {
      setPackages(data.slice(0, 14));
    });
  });

  const navigation = [
    { link: "", title: "Divisão" },
    { link: "", title: "Cronograma" },
  ];

  return (
    <>
      <BodyHeader title={project.nome || "Projeto"} navigation={navigation} />
      {JSON.stringify(packages)}
    </>
  );
};

export default Projeto;
