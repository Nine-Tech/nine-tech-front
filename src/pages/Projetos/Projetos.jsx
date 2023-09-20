import { useEffect } from "react";
import BodyHeaderProjeto from "../../components/BodyHeaderProjeto";
import "./style.scss";

const Projetos = () => {
  useEffect(() => {
    window.axios.get("");
  }, []);

  return <BodyHeaderProjeto />;
};

export default Projetos;
