import "./style.scss";

const BodyHeader = (props) => {
  const { title, children, navigation, progress } = props;
  console.log(progress);
  
  const formatoNumero = new Intl.NumberFormat('pt-BR').format(progress);

  const progressBar =
    progress !== undefined ? (
      <div className="d-flex align-items-center">
        {formatoNumero}%
        <div className="progress ms-2" style={{ width: "200px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    ) : (
      <div> {children}</div>
    );

  return (
    <div className="body-header">
      <div className={`p-4 ${navigation && "pb-0"}`}>
        <div className="d-flex justify-content-between">
          <h3>{title || "BodyHeader"}</h3>
          {progressBar}
        </div>
        <div className="my-3 divider" />
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
