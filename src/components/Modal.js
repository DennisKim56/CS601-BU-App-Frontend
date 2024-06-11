import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = ({ modalTitle, modalContent, modalFooter }) => {
  const content = (
    <div className="modal-overlay">
      <header className="modal-header">
        <h1>{modalTitle?.title}</h1>
        <h3>{modalTitle?.courseId}</h3>
      </header>
      <div className="modal-label">Course Description:</div>
      <div className="modal-content">{modalContent}</div>
      {modalFooter && (
        <>
          <div className="modal-label">Prerequisites:</div>
          <div className="modal-footer">{modalFooter}</div>
        </>
      )}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = ({ show, onCancel, modalTitle, modalContent, modalFooter }) => {
  return (
    <>
      {show && (
        <>
          <Backdrop onClick={onCancel} />
          <ModalOverlay
            modalTitle={modalTitle}
            modalContent={modalContent}
            modalFooter={modalFooter}
          />
        </>
      )}
    </>
  );
};

export default Modal;
