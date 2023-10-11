import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaWbs from "@/components/TabelaWbs";
import TabelaCronograma from "@/components/TabelaCronograma";
import CardsProjeto from "@/components/CardsProjeto";

const Pacote = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);
  const [cronograma, setCronograma] = useState({});
  const [pacote, setPacote] = useState({});
  const [subpacotes, setSubpacotes] = useState({});

  useEffect(() => {
    window.axios.get(`projeto/listar/${id}`).then(({ data }) => {
      setProject(data);
    });

    window.axios.get(`upload/${id}`).then(({ data }) => {
      setPackages(data);
    });

    window.axios.get(`pacotes/${id}`).then(({ data }) => {
      setPacote(data);
    });

    window.axios.get(`subpacotes/porIdProjeto/${id}`).then(({ data }) => {
      setSubpacotes(data);
    });

    window.axios.get(`cronograma/cronograma-por-wbe/${id}`).then(({ data }) => {
      setCronograma(data);
    });
  }, [id]);

  const navigation = [{ link: "#divisao", title: "Divisão" }];

  return (
    <>
      <BodyHeader title={pacote.nome || "Pacote"} navigation={navigation} />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="divisao" role="tabpanel">
          <TabelaWbs></TabelaWbs>
        </div>
      </div>
    </>
  );
};

export default Pacote;
