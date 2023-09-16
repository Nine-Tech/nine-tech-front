import { useEffect, useState } from "react";
import "./style.scss";

function TabelaWbs() {
  const [arquivoExcel, setArquivoExcel] = useState([]);

  useEffect(() => {
    function carregarArquivo() {
      fetch("http://localhost:5000/criarWBS")
        .then((r) => r.json())
        .then((json) => {
          setArquivoExcel(json);
        });
    }

    carregarArquivo();
  }, []);

  return (
    <div>
      {arquivoExcel.length === 0 && (
        <div className="containerTexto">
          <p className="texto">
            Por favor, clique no botão acima para importar seu arquivo Excel com
            os pacotes de trabalho. Após a importação, eles serão exibidos aqui.
          </p>
        </div>
      )}
      {arquivoExcel.lenght > 0 && (
        <div className="container-sm">
          <table className="table table-bordered">
            <thead>
              <tr className="table-active">
                <th>Atividade(WBE)</th>
                <th>Valor</th>
                <th>HH*</th>
                <th>Atribuição</th>
              </tr>
            </thead>
            <tbody>
              {arquivoExcel.map((item) => (
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TabelaWbs;
