import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

const TarefaLider = (props) => {
  const { id } = useParams();
  const { data } = props;
  const [tasks, setTasks] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    window.axios.get(`tarefas/subpacote/${id}`).then(({ data }) => {
      setTasks(Array.isArray(data) ? data : []);
    });
  }, [id, data]);

  function formatarData(data) {
    const [ano, mes, dia] = data;
    return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr className="table-active">
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Execução</th>
              <th>Peso</th>
              <th>Data Prevista</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className={errors.includes(t.id) ? "error" : ""}>
                <td>{t.id}</td>
                <td>
                  <input className="form-control" type="text" value={t.nome} />
                </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    value={t.descricao}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    value={t.execucao ? 1 : 0}
                  />
                </td>
                <td>
                  <input className="form-control" type="text" value={t.peso} />
                </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    value={formatarData(t.data)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TarefaLider;
