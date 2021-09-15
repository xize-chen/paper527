const dynamoDB = require('../middleware/DynamoDB');

/* sign up a new account with an email */
const signUp = (req, res) => {
  try {
    dynamoDB.signUp(JSON.parse(req.query.account), function (err, result) {
      if (err !== null) {
        console.log(`signUp----`);
        return res.status(210).send({ message: `${err}` });
      }
      return res
        .status(200)
        .send({ message: 'Sign up successfully', value: result });
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Serious error: Fail to sign up :${err}` });
  }
};

/* sign in with an email */
const signInWithEmailAndPassword = (req, res) => {
  try {
    dynamoDB.signInWithEmailAndPassword(
      req.query.email,
      req.query.password,
      function (err, result) {
        if (err !== null) {
          return res.status(210).send({ message: `Fail to sign in: ${err}` });
        }
        return res
          .status(200)
          .send({ message: 'Sign in successfully', value: result });
      }
    );
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Serious error: Fail to sign in :${err}` });
  }
};

/* update the password with a new password */
const updatePassword = (req, res) => {
  try {
    dynamoDB.updatePassword(
      req.query.email,
      req.query.password,
      function (err, result) {
        if (err !== null) {
          return res
            .status(210)
            .send({ message: `Fail to update the password: ${err}` });
        }
        return res
          .status(200)
          .send({ message: 'update the password successfully', value: result });
      }
    );
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Serious error: Fail to update the password :${err}` });
  }
};

/* save the account */
const saveAccount = (req, res) => {
  try {
    dynamoDB.saveAccount(JSON.parse(req.query.account), function (err, result) {
      if (err !== null) {
        return res
          .status(210)
          .send({ message: `Fail to save the account: ${err}` });
      }
      return res
        .status(200)
        .send({ message: 'save the account successfully', value: result });
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Serious error: Fail to save the account:${err}` });
  }
};

/* query account by an email address*/
const queryByEmail = (req, res) => {
  try {
    dynamoDB.queryByEmail(req.query.email, function (err, result) {
      if (err !== null) {
        return res
          .status(210)
          .send({ message: `Fail to query the account: ${err}` });
      }
      return res
        .status(200)
        .send({ message: 'query the account successfully', value: result });
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Serious error: Fail to query the account:${err}` });
  }
};

module.exports = {
  queryByEmail,
  saveAccount,
  updatePassword,
  signInWithEmailAndPassword,
  signUp,
}
