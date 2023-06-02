import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Notification from "../Notification";
import { Trans, useTranslation } from "react-i18next";

import { AuthContext } from "../../contexts/AuthContext";
import { authenticateUser } from "../../functions/auth";
import { PropTypes } from "prop-types";

const SignIn = ({ email, setEmail, password, setPassword, setForm }) => {
  document.title = "Recipe Roulette | Sign-in";
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { userPool, setUser } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await authenticateUser(userPool, email, password);
      if (result.user) {
        await setUser(result.user);
      }
      if (!result.success) {
        setForm("confirmRegistration");
      }
    } catch (err) {
      const error = { name: err.code };
      switch (err.code) {
        case "UserNotFoundException":
          error.message = t("notification.userNotFound");
          break;
        case "NotAuthorizedException":
          error.message = t("notification.notAuthorized");
          break;
        case "InternalErrorException":
          error.message = t("notification.internalError");
          break;
        default:
          error.message = t("notification.internalError");
          break;
      }
      setError(error);
    }
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>{t("authForm.signIn")}</h1>

      <Form onSubmit={handleSignIn}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>{t("authForm.emailLabel")}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t("authForm.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>{t("authForm.passwordLabel")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("authForm.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Text className="mb-2" as="div">
          <Trans i18nKey="authForm.newUserMsg">
            New user?
            <span className="ms-1 text-primary cursor-pointer" onClick={() => setForm("signUp")}>
              Create an account here
            </span>
          </Trans>
        </Form.Text>
        <Form.Text className="mb-2 text-primary cursor-pointer" onClick={() => setForm("passwordRecovery")} as="div">
          {t("authForm.forgotPassword")}
        </Form.Text>
        <Button variant="primary" type="submit">
          {t("authForm.signIn")}
        </Button>
      </Form>
      {error && <Notification type="danger" title={error?.name} body={error?.message} onClose={() => setError(null)} />}
    </Container>
  );
};

export default SignIn;

SignIn.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  setForm: PropTypes.func,
};
