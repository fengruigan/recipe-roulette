import React, { useContext, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Notification from "../Notification";

import { AuthContext } from "../../contexts/AuthContext";
import { signUpUser } from "../../functions/auth";
import { PropTypes } from "prop-types";

const SignUp = ({ email, setEmail, password, setPassword, setForm }) => {
  document.title = "Recipe Roulette | Sign-up";
  const { userPool, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await signUpUser(userPool, email, password);
      if (result) {
        await setUser(result.user);
        await setForm("confirmRegistration");
      } else {
        setError({ name: "UnknownException", message: "Something went wrong :(" });
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
          error.message = "Something went wrong :(";
          break;
      }
      setError(error);
    }
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">We&rsquo;ll never share your email with anyone else.</Form.Text>
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
        <Form.Text className="mb-2" muted={false} as="div">
          Already a user?
          <span className="ms-1 text-primary" onClick={() => setForm("signIn")}>
            Sign in here
          </span>
        </Form.Text>
        <Button variant="primary" type="submit">
          Sign Up
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
