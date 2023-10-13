import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardsProjeto from "@/components/CardsProjeto";

const Dashboard = () => {
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [pacotesProCard, setPacotesProCard] = useState([]);

  useEffect(() => {
    window.axios.get(`upload/${id}`).then(({ data }) => {
      setPackages(data);
    });


    window.axios.get(`pacotes/porIdProjeto/${id}`).then(({ data }) => {
      setPacotesProCard(data);
    });

  }, [id]);

  /* const formatarMoeda = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarMilhar = (value) => {
    return value
      .toLocaleString("pt-BR", { maximumFractionDigits: 0 })
      .replace(",", ".");
  }; */

  return (
    <>
      {pacotesProCard.length ? (
        <div className="row mt-5">
          {pacotesProCard.map((p) => (
            <div className="col-lg-4" key={p.id}>
              <Link
                to={`pacotes/${p.id}`}
                className="text-decoration-none text-primary"
              >
                <CardsProjeto nome={p.nome} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-5">
          Por favor, clique no botão acima para importar seu arquivo Excel com
          os pacotes de trabalho. Após a importação, eles serão exibidos aqui.
        </div>
      )}
    </>
  );
};

export default Dashboard;
