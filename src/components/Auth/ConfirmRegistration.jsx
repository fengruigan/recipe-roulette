import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Notification from "../Notification";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/AuthContext";
import { confirmRegistration, resendConfirmationCode } from "../../functions/auth";
import { PropTypes } from "prop-types";
import fetchWrap from "../../functions/fetchWrap";

const ConfirmRegistration = ({ email, password, setForm }) => {
  document.title = "Recipe Roulette | Confirm Sign-Up";
  const [code, setCode] = useState("");
  const { userPool, user, setUser } = useContext(AuthContext);
  const [resendCountDown, setResendCountDown] = useState(null);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmRegistration(userPool, email, password, code);
      if (result.success === true) {
        const createUser = await fetchWrap("/user", {
          method: "POST",
          body: JSON.stringify({ userId: result.user.username, language: i18n.language }),
        });
        if (createUser.ok) {
          await setUser(result.user);
        } else {
          setError({ name: "UnknownException", message: t("notification.internalError") });
        }
      } else {
        setError({ name: "UnknownException", message: t("notification.internalError") });
      }
    } catch (err) {
      const error = { name: err.code };
      if (err.code === "CodeMismatchException") {
        error.message = "The confirmation code does not match.";
      } else {
        error.message = t("notification.internalError");
      }
      setError(error);
    }
  };

  const startResendCountDown = () => {
    setResendCountDown(30);
    const interval = setInterval(() => {
      setResendCountDown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // TODO: send error msg
  const handleResendCode = async (e) => {
    e.preventDefault();
    try {
      const result = await resendConfirmationCode(user);
      if (result) {
        startResendCountDown();
      }
    } catch (err) {
      return;
    }
  };
  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>{t("authForm.confirmRegistration")}</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formConfirmationCode">
          <Form.Label>{t("authForm.confirmationCodeLabel")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("authForm.confirmationCodePlaceholder")}
            defaultValue={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={handleConfirm}>
          {t("authForm.confirmButton")}
        </Button>
        {/* TODO: translate resend button in count down state */}
        <Button variant="secondary" className="ms-1" disabled={!!resendCountDown} onClick={handleResendCode}>
          {resendCountDown ? `Redend in ${resendCountDown}s` : t("authForm.resendConfirmation")}
        </Button>
        <Button variant="secondary" className="ms-1" onClick={() => setForm("signIn")}>
          {t("authForm.backToSignIn")}
        </Button>
      </Form>
      {error && <Notification type="danger" title={error?.name} body={error?.message} onClose={() => setError(null)} />}
    </Container>
  );
};

export default ConfirmRegistration;

ConfirmRegistration.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setForm: PropTypes.func,
};
