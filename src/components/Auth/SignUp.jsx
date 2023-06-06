import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Notification from "../Notification";
import { Trans, useTranslation } from "react-i18next";

import { AuthContext } from "../../contexts/AuthContext";
import { signUpUser } from "../../functions/auth";
import { PropTypes } from "prop-types";

const SignUp = ({ email, setEmail, password, setPassword, setForm }) => {
  document.title = "Recipe Roulette | Sign-up";
  const { userPool, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await signUpUser(userPool, email, password);
      if (result) {
        await setUser(result.user);
        await setForm("confirmRegistration");
      } else {
        setError({ name: "UnknownException", message: t("notification.internalError") });
      }
    } catch (err) {
      const error = { name: err.code };
      switch (err.code) {
        case "UsernameExistsException":
          error.message = "Email already exists";
          break;
        case "InvalidPasswordException":
          error.message = "Password must be at least 6 characters long";
          break;
        case "InvalidParameterException":
          error.message = "Email must be a valid email";
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
      <h1>{t("authForm.signUp")}</h1>
      <Form onSubmit={handleSignUp}>
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
        <Form.Text className="mb-2" muted={false} as="div">
          <Trans i18nKey="authForm.existingUserMsg">
            Already a user?
            <span className="ms-1 text-primary" onClick={() => setForm("signIn")}>
              Sign in here
            </span>
          </Trans>
        </Form.Text>
        <Button variant="primary" type="submit">
          {t("authForm.signUp")}
        </Button>
      </Form>
      {error && <Notification type="danger" title={error?.name} body={error?.message} onClose={() => setError(null)} />}
    </Container>
  );
};

export default SignUp;

SignUp.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  setForm: PropTypes.func,
};
