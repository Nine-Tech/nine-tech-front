import React from 'react';

function CardsProjeto() {
    const nomesProjetos = ["Projeto A", "Projeto B", "Projeto C", "Projeto D", "Projeto E"]; 
    const totalCards = nomesProjetos.length; 

    const cardsPorLinha = 5; 
    const gruposDeCards = [];
    for (let i = 0; i < totalCards; i += cardsPorLinha) {
        const grupo = [];
        for (let j = i; j < i + cardsPorLinha && j < totalCards; j++) {
            grupo.push(
                <div className="card" key={j} style={{ width: '12rem', marginTop: '25px' }}>
                    <div className='project-square' style={{ width: '165px', margin: '12px 12px 1px 12px' }}></div>
                    <div className="card-body">
                        <h5 className="card-title">{nomesProjetos[j]}</h5>
                        <div className="progress" style={{ marginTop: '10px' }}>
                            <div className="progress-bar" role="progressbar" style={{ width: '30%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            );
        }
        gruposDeCards.push(
            <div className="d-flex flex-row justify-content-around" key={i}>
                {grupo}
            </div>
        );
    }

    return (
        <div>
            {gruposDeCards}
        </div>
    );
}

export default CardsProjeto;
