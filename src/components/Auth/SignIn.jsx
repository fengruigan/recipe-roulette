import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Notification from "../Notification";

import { AuthContext } from "../../contexts/AuthContext";
import { authenticateUser } from "../../functions/auth";
import { PropTypes } from "prop-types";

const SignIn = ({ email, setEmail, password, setPassword, setForm }) => {
  document.title = "Recipe Roulette | Sign-in";
  const [error, setError] = useState(null);
  const { userPool, setUser, setIsAuthed } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await authenticateUser(userPool, email, password);
      if (result.user) {
        await setUser(result.user);
      }
      if (result.success) {
        await setIsAuthed(true);
      } else {
        setForm("confirmRegistration");
      }
    } catch (err) {
      const error = { name: err.code };
      switch (err.code) {
        case "UserNotFoundException":
          error.message = "The user does not exist, please try again.";
          break;
        case "NotAuthorizedException":
          error.message = "The password is incorrect, please try again.";
          break;
        case "InternalErrorException":
          error.message = "Something went wrong :(";
          break;
        default:
          error.message = "Something went wrong :(";
          break;
      }
      setError(error);
    }
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>Sign In</h1>

      <Form onSubmit={handleSignIn}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Text className="mb-2" onClick={() => setForm("signUp")} as="div">
          New User?
          <span className="ms-1 text-primary cursor-pointer">Create an account here</span>
        </Form.Text>
        <Form.Text className="mb-2 text-primary cursor-pointer" onClick={() => setForm("passwordRecovery")} as="div">
          Forgot Password?
        </Form.Text>
        <Button variant="primary" type="submit">
          Sign In
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
