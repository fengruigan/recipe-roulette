import { CognitoUser, AuthenticationDetails, CognitoUserSession } from "amazon-cognito-identity-js";

const getSession = (user) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(new Error("No user specified"));
      return;
    }
    user.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session);
      return;
    });
  });
};

const getAuthedUserEmail = (user) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(new Error("No user specified"));
      return;
    }
    user.getUserAttributes((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const email = result.find((attribute) => attribute.Name === "email");
      resolve(email.Value);
      return;
    });
  });
};

const verifySessionAndRefresh = (user) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(new Error("No user specified"));
      return;
    }
    user.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      const cognitoSession = new CognitoUserSession({
        IdToken: session.idToken,
        AccessToken: session.accessToken,
        RefreshToken: session.refreshToken,
      });
      if (cognitoSession.isValid()) {
        resolve(true);
        return;
      }

      user.refreshSession(cognitoSession.getRefreshToken(), (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
        return;
      });
    });
  });
};

const authenticateUser = (userPool, email, password) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const details = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const authenticatingUser = new CognitoUser(userData);
    authenticatingUser.authenticateUser(details, {
      onSuccess: () => {
        resolve({ success: true, user: authenticatingUser });
        return;
      },
      onFailure: (err) => {
        if (err.code === "UserNotConfirmedException") {
          resolve({ success: false, user: authenticatingUser });
          return;
        } else {
          reject(err);
          return;
        }
      },
    });
  });
};

const signUpUser = (userPool, email, password) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], null, async (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  });
};

const confirmRegistration = (userPool, email, password, code) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
    user.confirmRegistration(code, true, async (err, result) => {
      if (err || result !== "SUCCESS") {
        reject(err);
        return;
      }
      try {
        const signInResult = await authenticateUser(userPool, email, password);
        resolve(signInResult);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const resendConfirmationCode = (user) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject(new Error("No user specified"));
      return;
    }
    user.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      return;
    });
  });
};

const logout = (user) => {
  user.signOut();
};

export {
  authenticateUser,
  getAuthedUserEmail,
  getSession,
  logout,
  signUpUser,
  confirmRegistration,
  resendConfirmationCode,
  verifySessionAndRefresh,
};
