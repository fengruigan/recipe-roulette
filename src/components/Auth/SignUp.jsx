import React, { useContext } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import PropTypes from "prop-types";

import { signUpUser } from "../../functions/auth";

const SignUp = ({ email, setEmail, password, setPassword, setForm }) => {
  document.title = "Recipe Roulette | Sign-up";
  const { userPool, setUser } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await signUpUser(userPool, email, password);
    if (result) {
      await setUser(result.user);
      await setForm("confirmRegistration");
    } else alert("Something went wrong");
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Form.Text className="ms-2" muted={false}>
          <span className="text-primary" onClick={() => setForm("signIn")}>
            Already have an account? Sign in
          </span>
        </Form.Text>
      </Form>
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
