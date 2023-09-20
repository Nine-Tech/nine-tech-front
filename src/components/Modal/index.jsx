import "./style.scss";

const Modal = (props) => {
  const { showModal, handler, header, footer, children } = props;

  return (
    <>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div>{header && header()}</div>
              <button className="btn-close" onClick={() => handler(false)} />
            </div>

            <div className="modal-body">{children}</div>

            {footer && <div className="modal-footer">{footer()}</div>}
          </div>
        </div>
      </div>

      <div className={`modal-backdrop ${showModal ? "show" : ""}`} />
    </>
  );
};

export default Modal;
