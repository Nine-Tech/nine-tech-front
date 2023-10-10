import BodyHeader from "@/components/BodyHeader";
import { useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import CardsProjeto from "@/components/CardsProjeto";

const HomeLider = () => {
  const [projects, setProjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.axios.get(`subpacotes/${id}`).then(({ data }) => {

      console.log(data);
      setProjects(data);
      
    });   

  }, [id]);
//fazer um map dentro do UEFe
//algumas vezes a chave valor nao ta batendo com o que eu estou mapeando
  return (
    <>
      <BodyHeader title={"Subpacotes"} className="mb-5" />

      {projects.length ? (
        <div className="row mt-5">
          {projects.map((p) => (
            
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
        <div className="text-center p-5">Não há projetos atribuídos!</div>
      )}
    </>
  );
};

export default HomeLider;
