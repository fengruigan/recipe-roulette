import React, { useContext } from "react";
import { Button, Form, Container } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";
import { authenticateUser } from "../../functions/auth";
import PropTypes from "prop-types";

const SignIn = ({ email, setEmail, password, setPassword, setForm }) => {
  document.title = "Recipe Roulette | Sign-in";

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
      switch (err.code) {
        case "UserNotFoundException":
          alert("User not found");
          break;
        case "NotAuthorizedException":
          alert("Incorrect password");
          break;
        default:
          alert("Unknown error");
          break;
      }
    }
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        <Form.Text className="mb-2 text-primary cursor-pointer" onClick={() => setForm("signUp")} as="div">
          New User? Create an account here
        </Form.Text>
        <Form.Text className="mb-2 text-primary cursor-pointer" onClick={() => setForm("passwordRecovery")} as="div">
          Forgot Password?
        </Form.Text>
        <Button variant="primary" onClick={handleSignIn}>
          Sign In
        </Button>
      </Form>
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
