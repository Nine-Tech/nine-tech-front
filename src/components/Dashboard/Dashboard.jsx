import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
    const { id } = useParams();
    const [packages, setPackages] = useState([]);

    useEffect(() => {       
        window.axios.get(`upload/${id}`).then(({ data }) => {
            setPackages(data);
        });
    }, [id]);

    const formatarMoeda = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatarMilhar = (value) => {
        return value.toLocaleString('pt-BR', { maximumFractionDigits: 0 }).replace(',', '.');
    };

    return (
        <>
            <div className="table-responsive-sm">
                <table className="tabela-wbs table table-bordered">
                    <thead>
                        <tr className="table-active">
                            <th>Atividade(WBE)</th>
                            <th>Valor</th>
                            <th>HH*</th>
                            <th>Material</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((item) => (
                            <tr
                                key={item.id}                                
                            >
                                <td>{item.wbe}</td>
                                <td>{formatarMoeda(item.valor)}</td>
                                <td>{formatarMilhar(item.hh)}</td>
                                <td>{formatarMoeda(item.material)}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </>
    );
}

export default Dashboard;
