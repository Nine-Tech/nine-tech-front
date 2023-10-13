import "./style.scss";
import ProgressBar from "@/components/BarraProgresso";

const BodyHeader = (props) => {
  const { title, children, navigation, progress } = props;

  const progressBar =
    progress !== undefined ? (
      <ProgressBar progress={progress} />
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
