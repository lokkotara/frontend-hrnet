import "./Modal.css";
import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {faCircleXmark,faXmark,faCircleCheck,faCircleInfo,faCircleExclamation,} from "@fortawesome/free-solid-svg-icons";

/**
 * Displays or hide a modal dialog.
 * 
 * @param {object} props
 * @param {boolean} props.isModalOpen - Whether to show the modal dialog.
 * @param {string} props.title - The title of the modal dialog.
 * @param {string} props.message - The message of the modal dialog.
 * @param {string} props.type - The type of the modal dialog.
 * @param {function} props.onClose - The function to call when the modal dialog is closed.
 * 
 *
 * @return  {JSX.Element}  display the template of the modal dialog
 */
export default function Modal({
  closeButtonStyle,
  icon,
  iconStyle,
  isCloseButton,
  isOpen,
  message,
  messageStyle,
  modalContainerStyle,
  modalStyle,
  onClose,
  title,
  titleStyle,
  modalMode,
}) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleClick = (e) => {
    e.stopPropagation();
    console.log(e.target.className);
    if (modalMode === undefined || modalMode === false) {
      if (e.target.className === "modal" ) onClose();
    } else if (modalMode) {
      if (e.target.className === "modalCloseButton") onClose();
    }
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  if (isModalOpen) {
    return (
      <div
        className="modal"
        style={modalContainerStyle}
        onClick={(e) => handleClick(e)}
      >
        <div className="modalContent" style={modalStyle}>
          <div className="modalHeader" style={titleStyle}>
            <span className="modalTitle">{title}</span>
            {isCloseButton === undefined || isCloseButton ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="modalCloseButton"
                style={closeButtonStyle ? closeButtonStyle : { color: "gray" }}
                onClick={() => {
                  onClose();
                }}
              />
            ) : null}
          </div>
          <div className="modalBody" style={messageStyle}>
            {icon && icon === "success" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { color: "green" }}
              >
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
            ) : icon && icon === "error" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { color: "red" }}
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </div>
            ) : icon && icon === "info" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { color: "lightblue" }}
              >
                <FontAwesomeIcon icon={faCircleInfo} />
              </div>
            ) : icon && icon === "danger" ? (
              <div
                className="modalIcon"
                style={iconStyle ? iconStyle : { color: "#EFCF00" }}
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
              </div>
            ) : null}
            <div className="modalBodyContent">
              {typeof message === "string" ? <span>{message}</span> : message}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
Modal.propTypes = {
  closeButtonStyle    : PropTypes.object,
  icon                : PropTypes.oneOf(["success", "warning", "error", "info"]),
  iconStyle           : PropTypes.object,
  isCloseButton       : PropTypes.bool,
  isOpen              : PropTypes.bool.isRequired,
  message             : PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  messageStyle        : PropTypes.object,
  modalStyle          : PropTypes.object,
  modalContainerStyle : PropTypes.object,
  onClose             : PropTypes.func.isRequired,
  title               : PropTypes.string,
  titleStyle          : PropTypes.object,
};
