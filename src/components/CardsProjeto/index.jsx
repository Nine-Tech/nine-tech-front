import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardsProjeto() {
    const [nomesProjetos, setNomesProjetos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/projeto/listar');
                const nomes = response.data.map(projeto => projeto.nome);
                setNomesProjetos(nomes);
            } catch (error) {
                console.error('Erro ao obter os dados dos projetos:', error);
                setNomesProjetos([]);
            }
        };

        fetchData();
    }, []);   

    return (
        <div>
            {nomesProjetos.length > 0 ? (
                <div>
                    {nomesProjetos.map((nome, index) => (
                        <div className="card" key={index} style={{ width: '12rem', marginTop: '25px' }}>
                            <div className='project-square' style={{ width: '165px', margin: '12px 12px 1px 12px' }}></div>
                            <div className="card-body">
                                <h5 className="card-title">{nome}</h5>
                                <div className="progress" style={{ marginTop: '10px' }}>
                                    <div className="progress-bar" role="progressbar" style={{ width: '30%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ marginTop: '25px', color: 'red', fontWeight: 'bold'}}>Nenhum projeto encontrado.</p>
            )}
        </div>
    );
}

export default CardsProjeto;
