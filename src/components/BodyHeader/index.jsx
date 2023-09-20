import "./style.scss";
import { Link } from "react-router-dom";

const BodyHeader = (props) => {
  const { title, children, navigation } = props;

  return (
    <div className="body-header">
      <div className={`p-4 ${navigation && "pb-0"}`}>
        <div className="d-flex justify-content-between">
          <h3>{title || "BodyHeader"}</h3>

          <div>{children}</div>
        </div>
        <div className="my-3 divider" />
      </div>

      <div className="d-flex justify-content-between">
        {navigation && (
          <ul className="nav nav-tabs d-flex">
            {navigation.map((nav) => {
              return (
                <li className="nav-item" key={nav.title}>
                  <Link className="nav-link" to={nav.link}>
                    {nav.title}
                  </Link>
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
