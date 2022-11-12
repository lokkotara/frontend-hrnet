import "./Modal.scss";
import { useState,useEffect } from "react";

export default function Modal({ isModal }) {
  const [isOpen, setIsOpen] = useState(isModal);
  useEffect(() => {
    setIsOpen(isModal);
  }, [isModal]);
  if(isOpen) {
  return (
    <div className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <h2 className="modalTitle">Create an Employee</h2>
          <button className="modalCloseButton" onClick={() => {setIsOpen(false)}}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modalBody">
          <p>Employee successfully created</p>
        </div>
      </div>
    </div>
  );
  } else {
    return null;
  }
}