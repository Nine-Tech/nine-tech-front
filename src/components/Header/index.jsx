const Header = (props) => {
  const { title, userTitle } = props;

  return (
    <div className="header d-flex align-items-center justify-content-between my-4 col-lg-12">
      <h2>{title}</h2>
      <span className="font-size-20">{userTitle}</span>
    </div>
  );
};

export default Header;
