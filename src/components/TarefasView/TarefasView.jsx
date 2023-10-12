import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";


const TarefasView = (props) => {
    const { id } = useParams();
    const { data } = props;
    const [tasks, setTasks] = useState([]);
    const [packages, setPackages] = useState([]);
    const [updatedData, setUpdatedData] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);

    const [errors, setErrors] = useState([]);


    useEffect(() => {
        window.axios.get(`tarefas/subpacote/${id}`).then(({ data }) => {
            setTasks(data);
        });
    }, [id, data]);

    const reset = () => {
        const resetTasks = [...data];

        setTasks(resetTasks);
        setErrors([]);
        setIsChanged(false);
    };

    const update = (e, tarefa) => {
        if (!isChanged) setIsChanged(true);
        const target = e.target;

        const updatedItem = { ...tarefa, [target.name]: target.value };
        if (target.type === "number" && target.value < 0)
            updatedItem[target.name] = 0;

        const newData = {
            ...updatedData,
            [tarefa.id]: updatedItem,
        };
        setUpdatedData(newData);

        const updatedPackages = [
            ...tasks.map((t) => (t.id === tarefa.id ? updatedItem : t)),
        ];
        setPackages(updatedPackages);
    };

    const save = () => {
        setLoading(true);
        setErrors([]);

        Promise.allSettled([
            ...Object.keys(updatedData).map((k) => {
                let tarefa = updatedData[k];

                let data = {
                    descricao: tarefa.descricao,
                    data: tarefa.data,
                    hh: tarefa.hh,
                    material: tarefa.material,
                    nome: tarefa.nome,
                    peso: tarefa.peso,
                    execucao: tarefa.execucao,
                    subpacotes: {
                        id: id
                    }
                    /* novoHH: parseFloat(tarefa.hh) || 0,
                    novoValor: parseFloat(tarefa.valor) || 0,
                    novoMaterial: parseFloat(tarefa.material) || 0,
                    novoLiderDeProjetoId: parseInt(tarefa.liderDeProjeto),
                    novoProjetoId: parseInt(tarefa.projeto?.id), */
                };

                return new Promise((resolve, reject) => {
                    window.axios
                        .put(`tarefas/${tarefa.id}`, data)
                        .then(resolve)
                        .catch(() => reject(tarefa.id));
                });
            }),
        ])
            .then((results) =>
                setErrors(
                    results.filter((r) => r.status === "rejected").map((r) => r.reason),
                ),
            )
            .finally(() => {
                setIsChanged(false);
                setLoading(false);
                setToast(true);
            });
    };

    /* function formatarData(data) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(data).toLocaleDateString('pt-BR', options);
      } */

    return (
        <>
            <Toast show={toast} toggle={setToast}>
                {errors.length
                    ? "Certifique-se de que não deixou nenhum campo vazio."
                    : "Mudanças salvas."}
            </Toast>

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
                                <th>Valor</th>
                                <th>HH*</th>
                                <th>Material</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((tarefa) => (
                                <tr
                                    key={tarefa.id}
                                    className={errors.includes(tarefa.id) ? "error" : ""}
                                >
                                    <td>{tarefa.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={tarefa.nome}
                                            onChange={(e) => update(e, tarefa)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="descricao"
                                            value={tarefa.descricao}
                                            onChange={(e) => update(e, tarefa)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="execucao"
                                            value={tarefa.execucao ? 1 : 0}
                                            onChange={(e) => update(e, tarefa)}
                                        />

                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="peso"
                                            value={tarefa.peso}
                                            onChange={(e) => update(e, tarefa)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="text"
                                            name="data"
                                            value={tarefa.data}
                                            onChange={(e) => update(e, tarefa)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="valor"
                                            value={tarefa.valor}
                                            onChange={(e) => update(e, tarefa)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="hh"
                                            value={tarefa.hh}
                                            onChange={(e) => update(e, tarefa)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="material"
                                            value={tarefa.material}
                                            onChange={(e) => update(e, tarefa)}
                                        />
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            ) : (
                <div className="text-center p-5">Não há tarefas criada!</div>
            )}
            <div className="mt-4 d-flex justify-content-end">
                <button
                    className="btn btn-secondary"
                    disabled={!isChanged}
                    onClick={reset}
                >
                    Desfazer alterações
                </button>
                <button
                    className="btn btn-primary ms-3"
                    disabled={!isChanged}
                    onClick={save}
                >
                    {loading ? (
                        <div
                            role="status"
                            className="spinner-border"
                            style={{ width: "1rem", height: "1rem" }}
                        />
                    ) : (
                        "Salvar"
                    )}
                </button>
            </div>
        </>
    )
}

export default TarefasView