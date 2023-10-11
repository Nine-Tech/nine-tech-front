import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

const TarefasView = (props) => {
  const { id } = useParams();
  const { data } = props;
  const [tasks, setTasks] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    window.axios.get(`tarefas/subpacote/${id}`).then(({ data }) => {
      setTasks(data);
    });
  }, [id, data]);

  function formatarData(data) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(data).toLocaleDateString("pt-BR", options);
  }

  return (
    <>
      {tasks.length ? (
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
                  <td>{t.nome}</td>
                  <td>{t.descricao}</td>
                  <td>{t.execucao ? 1 : 0}</td>
                  <td>{t.peso}</td>
                  <td>{formatarData(t.data)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-5">Não há tarefas criada!</div>
      )}
    </>
  );
};

export default TarefasView;
