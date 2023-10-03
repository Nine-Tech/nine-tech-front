import React from 'react';

const CardBody = ({ wbe, valor, hh, material }) => {
  return (
    <div>
      <h4>WBE: {wbe}</h4>
      <p>Valor: {valor}</p>
      <p>HH: {hh}</p>
      <p>Material: {material}</p>
    </div>
  );
}

export default CardBody;
