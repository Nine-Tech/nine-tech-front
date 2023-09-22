import { useEffect, useState } from "react";
import "./style.scss";

function TabelaWbs(props) {
  const { data } = props;

  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    window.axios.get("lider/listar").then(({ data }) => {
      setLeaders(data);
    });
  }, []);

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr className="table-active">
            <th>Atividade(WBE)</th>
            <th>Valor</th>
            <th>HH*</th>
            <th>Atribuição</th>
          </tr>
        </thead>
        {JSON.stringify(leaders)}
        {/* <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.wbs}</td>
              <td>{item.valor}</td>
              <td>{item.hh}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  aria-label="small select example"
                >
                  <option selected>Selecione o Grupo Responsável</option>
                  <option>Líder Projeto 1</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
      {JSON.stringify(data)}
    </>
  );
}

export default TabelaWbs;
