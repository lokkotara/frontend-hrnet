import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Modal.css";

export default function Modal({
  body,
  bodyStyle,
  closeButtonStyle,
  icon,
  iconStyle,
  isCloseButton,
  isOpen,
  modalStyle,
  onClose,
  title,
  titleStyle,
}) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.className === "modal") {
      onClose();
    }
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  if (isModalOpen) {
    return (
      <div className="modal" onClick={(e) => handleClick(e)}>
        <div className="modalContent" style={modalStyle}>
          <div className="modalHeader" style={titleStyle}>
            <span className="modalTitle">{title}</span>
            {isCloseButton === undefined || isCloseButton ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320.15 320.15"
                className="modalCloseButton"
                style={closeButtonStyle ? closeButtonStyle : { fill: "gray" }}
                onClick={() => {
                  onClose();
                }}
              >
                <g id="cross-icon-container" data-name="cross icon container">
                  <g id="cross-icon">
                    <path
                      id="cross-icon"
                      d="M310.68,54.68a32,32,0,0,0-45.3-45.3L160.08,114.77,54.67,9.47A32,32,0,0,0,9.38,54.77l105.39,105.3L9.48,265.47a32,32,0,0,0,45.29,45.3l105.31-105.4L265.47,310.68a32,32,0,0,0,45.3-45.3L205.38,160.07Z"
                    />
                  </g>
                </g>
              </svg>
            ) : null}
          </div>
          <div className="modalBody" style={bodyStyle}>
            {icon && icon === "success" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { fill: "green" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <g
                    id="success-icon-container"
                    data-name="success icon container"
                  >
                    <g id="success-icon" data-name="success icon">
                      <path d="M256,512c141.4,0,256-114.6,256-256S397.4,0,256,0,0,114.6,0,256,114.6,512,256,512ZM369,209,241,337a23.9,23.9,0,0,1-33.9,0l-64-64A24,24,0,0,1,177,239.1l47,47L335,175a24,24,0,1,1,33.9,33.9Z" />
                    </g>
                  </g>
                </svg>
              </div>
            ) : icon && icon === "error" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { fill: "red" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <g id="error-icon-container" data-name="error icon container">
                    <g id="error-icon" data-name="error-icon">
                      <path d="M256,512c141.4,0,256-114.6,256-256S397.4,0,256,0,0,114.6,0,256,114.6,512,256,512ZM175,175a23.9,23.9,0,0,1,33.9,0l47,47,47-47a24,24,0,1,1,33.9,33.9l-47,47,47,47a24,24,0,1,1-33.9,33.9l-47-47-47,47A24,24,0,1,1,175,302.9l47-47-47-47A23.9,23.9,0,0,1,175,175Z" />
                    </g>
                  </g>
                </svg>
              </div>
            ) : icon && icon === "info" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { fill: "lightblue" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <g id="info-icon-container" data-name="info icon container">
                    <g id="info-icon" data-name="info icon">
                      <path d="M256,512c141.4,0,256-114.6,256-256S397.4,0,256,0,0,114.6,0,256,114.6,512,256,512ZM216,336h24V272H216a24,24,0,0,1,0-48h48a23.94,23.94,0,0,1,24,24v88h8a24,24,0,0,1,0,48H216a24,24,0,0,1,0-48Zm40-144a32,32,0,1,1,32-32A32,32,0,0,1,256,192Z" />
                    </g>
                  </g>
                </svg>
              </div>
            ) : icon && icon === "danger" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { fill: "yellow" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <g
                    id="danger-icon-container"
                    data-name="danger icon container"
                  >
                    <g id="danger-icon" data-name="danger icon">
                      <path d="M256,512c141.4,0,256-114.6,256-256S397.4,0,256,0,0,114.6,0,256,114.6,512,256,512Zm0-384a23.94,23.94,0,0,1,24,24V264a24,24,0,0,1-48,0V152A23.94,23.94,0,0,1,256,128Zm32,224a32,32,0,1,1-32-32A32,32,0,0,1,288,352Z" />
                    </g>
                  </g>
                </svg>
              </div>
            ) : null}
            <div className="modalBodyContent">
              {typeof body === "string" ? <span>{body}</span> : body}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
