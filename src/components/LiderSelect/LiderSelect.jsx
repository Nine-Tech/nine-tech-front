import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "@/components/Toast";

const LiderSelect = (props) => {
    const { id } = useParams();
    const { data } = props;
    const [packages, setPackages] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [updatedData, setUpdatedData] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [errors, setErrors] = useState([]);

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState(false);

    // deixar tudo no mesmo useEffect
    // pegar as infos do get e jogar em PACKAGES
    // criar um useState para ter os lideres - utilizar o PACKAGES é uma opção (vai ter que usar mais lógica)
    // pegar a informacao de quem é o lider de projeto 


    useEffect(() => {
        window.axios.get(`lider/listar`).then(({ data }) => {
            setLeaders(data);
            console.log(data)
        });

        window.axios.get(`upload/${id}`).then(({ data }) => {
            setPackages(data);
            console.log("setPackages Data")

            console.log(data)
        })

        window.axios.get(`upload/${id}`).then(({ data }) => {
            // Mapeie os dados recebidos e extraia apenas o ID do líder de projeto
            const modifiedData = data.map(item => {
                return {
                    ...item,
                    liderDeProjeto: item.liderDeProjeto // Extraia o ID aqui
                };
            });
            setPackages(modifiedData);
            console.log("Data com item.liderDeProjeto")
            console.log(data)
        });
    }, [id]);

    const reset = () => {
        const resetPackages = [...data];

        setPackages(resetPackages);
        setErrors([]);
        setIsChanged(false);
    };
    //problema não é o UPDATE
    const update = (e, item) => {
        if (!isChanged) setIsChanged(true);
        const target = e.target;
        console.log("target.name");
        console.log(target.name);
        console.log(target.value);

        const updatedItem = { ...item, [target.name]: target.value };
        if (target.type === "number" && target.value < 0)
            updatedItem[target.name] = 0;

        const newData = {
            ...updatedData,
            [item.id]: updatedItem,
        };
        console.log("newData")
        console.log(newData)
        setUpdatedData(newData);

        const updatedPackages = [
            ...packages.map((p) => (p.id === item.id ? updatedItem : p)),
        ];
        console.log("updatedPackages")
        console.log(updatedPackages)
        setPackages(updatedPackages);
        console.log("ITEM")
        console.log(item)
    };

    const save = () => {
        setLoading(true);
        setErrors([]);

        Promise.allSettled([
            ...Object.keys(updatedData).map((k) => {
                let item = updatedData[k];


                let data = {
                    liderDeProjeto: parseInt(item.liderDeProjeto),
                };
                console.log("SAVE data")
                console.log(data)
                console.log("SAVE updatedData")
                console.log(updatedData)
                console.log("SAVE updatedData K")
                console.log(updatedData[k])

                let teste = item.liderDeProjeto.id
                console.log("teste item Lider")
                console.log(teste)

                return new Promise((resolve, reject) => {
                    window.axios
                        .put(`upload/${item.liderDeProjeto}`, data)
                        .then(resolve)
                        .catch(() => reject(item.id));
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

    return (
        <>
            <Toast show={toast} toggle={setToast}>
                {errors.length
                    ? "Certifique-se de que não deixou nenhum campo vazio."
                    : "Mudanças salvas."}
            </Toast>

            <div className="table-responsive">
                <table className="tabela-wbs table table-bordered">
                    <thead>
                        <tr className="table-active">
                            <th>Atividade(WBE)</th>
                            <th>Atribuição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((item) => (
                            <tr key={item.id}>
                                <td>{item.wbe}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        aria-label="small select example"
                                        value={item.liderDeProjeto || ""}
                                        name="liderDeProjeto"
                                        onChange={(e) => update(e, item)}
                                    >
                                        <option disabled value={""}>
                                            Selecione o Grupo Responsável
                                        </option>
                                        {leaders.map((l, i) => (
                                            <option value={l.id} key={i}>
                                                {l.nome}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
    );
};

export default LiderSelect;
