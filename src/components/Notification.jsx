import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faCircleCheck, faCircleInfo, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { PropTypes } from "prop-types";

const Notification = ({
  onClose,
  type = "primary",
  title = "Notification",
  body = "Hi there! This is a notification",
  position = "top-center",
  duration = 5000,
  autohide = true,
}) => {
  const icon = {
    success: faCircleCheck,
    warning: faCircleExclamation,
    info: faCircleInfo,
    danger: faBug,
    primary: faCircleInfo,
    secondary: faCircleInfo,
  };

  return (
    <ToastContainer position={position} style={{ zIndex: 1, padding: "30px", position: "absolute" }}>
      <Toast show={true} autohide={autohide} delay={duration} onClose={onClose} animation bg={type}>
        <Toast.Header>
          <FontAwesomeIcon icon={icon[type]} className="me-2" style={{ fontSize: "1.25em" }} />
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className={type === "warning" || type === "info" ? "text-dark" : "text-white"}>{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;

Notification.propTypes = {
  type: PropTypes.oneOf(["success", "warning", "info", "danger", "primary", "secondary"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
  position: PropTypes.oneOf([
    "top-start",
    "top-center",
    "top-end",
    "middle-start",
    "middle-center",
    "middle-end",
    "bottom-start",
    "bottom-center",
    "bottom-end",
  ]),
  title: PropTypes.string,
  body: PropTypes.string,
  autohide: PropTypes.bool,
};
