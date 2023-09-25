const Toast = (props) => {
  const { show, toggle, children } = props;

  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          id="liveToast"
          className={`toast ${show && "show"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header bg-primary">
            <div className="me-auto">9Tech</div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => toggle(false)}
            />
          </div>
          <div className="toast-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Toast;
