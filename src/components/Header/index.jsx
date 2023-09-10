import "./style.scss";

const Header = (props) => {
  const { title } = props;

  return (
    <div className="header d-flex align-items-center justify-content-between">
      <h2>{title}</h2>
      <span className="font-size-20">Engenheiro chefe</span>
    </div>
  );
};

export default Header;
