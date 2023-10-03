import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import CardBody from '../CardBody';

const TabelaTeste = (props) => {

    const { id } = useParams();
    const { data } = props;
    const [packages, setPackages] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        window.axios.get(`lider/listar`).then(({ data }) => {
            setLeaders(data);
        });

        setPackages(
            data.map((i) => {
                return { ...i, liderDeProjeto: i.liderDeProjeto?.lider_de_projeto_id };
            }),
        );
    }, [id, data]);

    function formatarMoeda(valor) {
        return parseFloat(valor).toFixed(2);
    }
    const renderizarItens = () => {
        const itensPais = packages.filter((item) => item.filho === false);
        return itensPais.map((itemPai) => {
          const filhos = packages.filter((item) => item.wbePai?.id === itemPai.id);
          return (
            <div key={itemPai.id}>
              
              <div>
                {filhos.map((itemFilho) => (
                  <CardBody 
                    key={itemFilho.id}
                    wbe={itemFilho.wbe} 
                    valor={itemFilho.valor} 
                    hh={itemFilho.hh} 
                    material={itemFilho.material} 
                  />
                ))}
              </div>
            </div>
          );
        });
      }
      
      return (
        <>
          <div className="card text-center">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                {packages.map((item) => (
                  item.wbePai === null && (
                    <li className="nav-item" key={item.id}>
                      <Link className="nav-link active" to={`/engenheirochefe/projetos/${id}/${item.id}`}>
                        {item.wbe}
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>
            <div className="card-body">
              {renderizarItens()}
            </div>
          </div>
        </>
      )
    }

export default TabelaTeste