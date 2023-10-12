import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BodyHeader from "@/components/BodyHeader";
import TabelaWbs from "@/components/TabelaWbs";
import TabelaCronograma from "@/components/TabelaCronograma";
import CardsProjeto from "@/components/CardsProjeto";

const Pacote = () => {
  const { pacoteId } = useParams();

  const [project, setProject] = useState({});
  const [packages, setPackages] = useState([]);
  const [cronograma, setCronograma] = useState({});
  const [pacote, setPacote] = useState({});
  const [subpacotes, setSubpacotes] = useState({});

  useEffect(() => {
    window.axios.get(`projeto/listar/${pacoteId}`).then(({ data }) => {
      setProject(data);
    });

    window.axios.get(`upload/${pacoteId}`).then(({ data }) => {
      setPackages(data);
    });

    window.axios.get(`pacotes/${pacoteId}`).then(({ data }) => {
      setPacote(data);
    });

    window.axios.get(`subpacotes/porIdProjeto/${pacoteId}`).then(({ data }) => {
      setSubpacotes(data);
    });

    window.axios.get(`cronograma/cronograma-por-wbe/${pacoteId}`).then(({ data }) => {
      setCronograma(data);
    });
  }, [pacoteId]);

  const navigation = [{ link: "#divisao", title: "Divisão" }];

  return (
    <>
      <BodyHeader title={pacote.nome || "Pacote"} navigation={navigation} />
      <div className="my-5 tab-content">
        <div className="tab-pane active" id="divisao" role="tabpanel">
          {subpacotes.length ? (
            <div className="row mt-5">
              {subpacotes.map((p) => (
                <div className="col-lg-4" key={p.id}>
                  <Link
                    to={`subpacotes/${p.id}`}
                    className="text-decoration-none text-primary"
                  >
                    <CardsProjeto nome={p.nome} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-5">
              No momento não existem tarefas criadas para esse Pacote, por favor volte mais tarde!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pacote;
