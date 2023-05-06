import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { confirmRegistration, resendConfirmationCode } from "../functions/auth";

const ConfirmRegistration = () => {
  document.title = "Recipe Roulette | Confirm Sign-Up";
  const [code, setCode] = useState("");
  const { user, setUser, setIsAuthed } = useContext(AuthContext);
  const [resendCountDown, setResendCountDown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Flow error");
    }
  }, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmRegistration(user, code);
      if (result === "SUCCESS") {
        await setUser(user);
        await setIsAuthed(true);
        navigate("/account");
      }
    } catch (err) {
      if (err.code === "CodeMismatchException") {
        // Error handle
        console.log("Code mismatch");
      }
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
      <h1>Finish Signing Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formConfirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter code"
            defaultValue={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" className="ms-1" disabled={!!resendCountDown} onClick={handleResendCode}>
          {resendCountDown ? `Redend in ${resendCountDown}s` : "Resend Code"}
        </Button>
        <Button variant="warning" className="ms-1" onClick={() => navigate("/signin")}>
          Retry
        </Button>
        <Form.Text className="ms-2" muted={false}>
          <Link to="/signin">Back to Sign in</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default ConfirmRegistration;
