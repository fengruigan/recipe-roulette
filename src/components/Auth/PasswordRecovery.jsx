import React, {
  // useContext,
  useState,
} from "react";
import { Button, Form, Container } from "react-bootstrap";
// import { AuthContext } from "../../contexts/AuthContext";
import { PropTypes } from "prop-types";

const PasswordRecovery = ({ setForm }) => {
  document.title = "Recipe Roulette | Confirm Sign-Up";
  const [code, setCode] = useState("");
  //   const { userPool, user, setUser, setIsAuthed } = useContext(AuthContext);
  const [resendCountDown, setResendCountDown] = useState(null);

  const handleConfirm = async (e) => {
    e.preventDefault();
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
      const result = true;
      if (result) {
        startResendCountDown();
      }
    } catch (err) {
      return;
    }
  };

  return (
    <Container style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <h1>Reset Password</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formConfirmationCode">
          <Form.Label>Verification Code</Form.Label>
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
        <Form.Text className="ms-2" muted={false}>
          <span className="text-primary cursor-pointer" onClick={() => setForm("signIn")}>
            Back to Sign in
          </span>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default PasswordRecovery;

PasswordRecovery.propTypes = {
  setForm: PropTypes.func,
};
