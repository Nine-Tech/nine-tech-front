import BodyHeader from "@/components/BodyHeader";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CardsProjeto from "@/components/CardsProjeto";

const HomeLider = () => {
  const [projects, setProjects] = useState([]);  

  useEffect(() => {
    window.axios.get("projeto").then(({ data }) => {
      console.log(data);
      setProjects(data);
    });

  }, []);

  return (
    <>

      <BodyHeader title={"Projetos"} className="mb-5" />

      {projects.length ? (
        <div className="row mt-5">
          {projects.map((p) => (
            <div className="col-lg-4" key={p.id}>
              <Link to={`projetos/${p.id}`} className="text-decoration-none text-primary">
                <CardsProjeto nome={p.nome} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-5">
          Não há projetos atribuídos!
        </div>
      )}
    </>
  );
};

export default HomeLider;
