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

    const renderCards = () => {
        const cardsPorLinha = 3;

        return nomesProjetos.reduce((gruposDeCards, nome, index) => {
            const grupoAtual = Math.floor(index / cardsPorLinha);
            if (!gruposDeCards[grupoAtual]) {
                gruposDeCards[grupoAtual] = [];
            }

            gruposDeCards[grupoAtual].push(
                <div className="card" key={index} style={cardStyle}>
                    <div className="card-body">
                        <h5 className="card-title" style={{fontWeight: 'bolder'}}>{nome}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="progress" style={progressStyle}>
                                <div className="progress-bar" role="progressbar" style={progressBarStyle} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <span style={spanStyle}>45%</span>
                        </div>
                    </div>
                </div>
            );

            return gruposDeCards;
        }, []).map((grupo, index) => (
            <div key={index} className="d-flex justify-content-between">
                {grupo}
            </div>
        ));
    };

    const cardStyle = {
        width: '30%',
        marginTop: '25px',
        marginLeft: '5px',
        marginRight: '10px',
    };

    const progressStyle = {
        width: '70%',
        marginTop: '10px',
    };

    const progressBarStyle = {
        width: '45%',
    };

    const spanStyle = {
        fontSize: 'small',
        marginTop: '15px',
    };

    return (
        <div>
            {nomesProjetos.length > 0 ? (
                renderCards()
            ) : (
                <p style={{ marginTop: '25px', color: 'red', fontWeight: 'bold'}}>Nenhum projeto encontrado.</p>
            )}
        </div>
    );
}

export default CardsProjeto;
