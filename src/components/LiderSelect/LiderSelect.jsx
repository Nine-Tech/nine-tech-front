import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LiderSelect = () => {
    const { id } = useParams();
    const [packages, setPackages] = useState([]);

    useEffect(() => {       
        window.axios.get(`upload/${id}`).then(({ data }) => {
            setPackages(data);
        });
    }, [id]);

    return (
        <>
            <div className="table-responsive">
                <table className="tabela-wbs table table-bordered">
                    <thead>
                        <tr className="table-active">
                            <th>Atividade(WBE)</th>
                            <th>Atribuição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((item) => (
                            <tr
                                key={item.id}                                
                            >
                                <td>{item.wbe}</td>
                                <td>{item.liderDeProjeto ? item.liderDeProjeto.nome : 'Nenhum líder atribuído'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </>
    );
}

export default LiderSelect;
