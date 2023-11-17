import "./style.scss";
import ProgressBar from "@/components/BarraProgresso";

const BodyHeader = (props) => {
  const {
    id,
    title,
    children,
    navigation,
    data_inicio,
    data_final,
    porcentagem,
  } = props;

  function formatDataParaExibicao(data) {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <div className="body-header">
      <div className={`p-4 ${navigation && "pb-0"}`}>
        <div className="d-flex justify-content-between">
          <h3>{title || "BodyHeader"}</h3>
          <div className="ms-auto p-2">{children}</div>

          <div className="d-flex align-items-end flex-column mb-3">
            {id && <p className="card-title font-weight-bold">ID: {id}</p>}
            {data_inicio && (
              <p className="card-title font-weight-bold">
                Início: {formatDataParaExibicao(data_inicio)}
              </p>
            )}
            {data_final && (
              <p className="card-title font-weight-bold">
                Término: {formatDataParaExibicao(data_final)}
              </p>
            )}
            {porcentagem !== null && porcentagem !== undefined && (
              <div className="ms-auto">
                <ProgressBar progress={porcentagem} />
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 divider" />
      </div>

      <div className="d-flex justify-content-between">
        {navigation && (
          <ul className="nav nav-tabs d-flex">
            {navigation.map((nav, i) => {
              return (
                <li className="nav-item" key={nav.title}>
                  <button
                    className={`nav-link ${!i && "active"}`}
                    data-bs-target={nav.link}
                    data-bs-toggle="tab"
                    type="button"
                    role="tab"
                    id={nav.title}
                  >
                    {nav.title}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BodyHeader;
