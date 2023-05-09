import React, { useContext, useEffect, useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ConfirmRegistration from "../components/Auth/ConfirmRegistration";
import PasswordRecovery from "../components/Auth/PasswordRecovery";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState("signIn"); // signIn, signUp, confirmRegistration, PasswordRecovery
  const { isAuthed } = useContext(AuthContext);
  const navigate = useNavigate();

  const forms = {
    signIn: (
      <SignIn email={email} setEmail={setEmail} password={password} setPassword={setPassword} setForm={setForm} />
    ),
    signUp: (
      <SignUp email={email} setEmail={setEmail} password={password} setPassword={setPassword} setForm={setForm} />
    ),
    confirmRegistration: <ConfirmRegistration email={email} password={password} setForm={setForm} />,
    passwordRecovery: <PasswordRecovery setForm={setForm} />,
  };
  useEffect(() => {
    if (isAuthed) {
      navigate("/account");
    }
  }, [isAuthed]);

  return forms[form];
};

export default AuthPage;
