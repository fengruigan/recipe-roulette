import React, { useState } from "react";
import { Button, InputGroup, Form, Container } from "react-bootstrap";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

const userPoolConfig = {
  UserPoolId: "us-west-2_jsPuJX2AC",
  ClientId: "3teb82sj2427e84rq62i36jt64",
};
const userPool = new CognitoUserPool(userPoolConfig);

const AuthPage = ({ signIn }) => {
  //   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return signIn ? <SignIn /> : <SignUp />;
};

export default AuthPage;
