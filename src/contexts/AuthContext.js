import React, { createContext, useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { getSession } from "../functions/auth";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const userPoolConfig = {
    UserPoolId: "us-west-2_jsPuJX2AC",
    ClientId: "3teb82sj2427e84rq62i36jt64",
  };
  const userPool = new CognitoUserPool(userPoolConfig);
  const [user, setUser] = useState(() => {
    const user = userPool.getCurrentUser();
    if (user) getSession(user);
    return user;
  });
  const [isAuthed, setIsAuthed] = useState(() => !!user);

  const values = {
    userPool,
    user,
    setUser,
    isAuthed,
    setIsAuthed,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
