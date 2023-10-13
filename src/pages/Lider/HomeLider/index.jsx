import BodyHeader from "@/components/BodyHeader";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardsProjeto from "@/components/CardsProjeto";

const HomeLider = () => {
  const [projects, setProjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.axios.get(`subpacotes/${id}`).then(({ data }) => {
      setProjects(data);
    });
  }, [id]);

  return (
    <>
      <BodyHeader title={"Projetos"} className="mb-5" />
      {projects.length ? (
        <div className="row mt-5">
          {projects.map((p) => (
            <div className="col-lg-4" key={p.id}>
              <Link
                to={`subpacotes/${p.id}`}
                className="text-decoration-none text-primary"
              >
                <CardsProjeto nome={p.nome} porcentagem={p.porcentagem} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-5">Não há subpacotes atribuídos!</div>
      )}
    </>
  );
};

export default HomeLider;
