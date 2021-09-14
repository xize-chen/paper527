const athenaDatabase = require('../middleware/AthenaDatabase');
const dynamoDB = require('../middleware/DynamoDB');

/* covid-19 situation worldwide: */
const getSummaryOfWorld = (req, res) => {
  try {
    if (req.query.date == null || req.query.date == undefined) {
      throw new Error('Invalid date');
    }
    date = req.query.date;
    athenaDatabase.getSummaryOfWorld(date, function (err, result) {
      if (err !== null) {
        return res.status(500).send({
          message: `Could not get summary information ${date}:${err}`,
        });
      }
      return res.status(200).send({
        message: 'Get summary information successfully',
        value: result,
      });
    });
  } catch (err) {
    return res.status(500).send({
      message: `Serious error: Could not get summary information :${err}`,
    });
  }
};

/* Used for the map visualization of total cases at the specific time by location
---including ordering by group */
const getTotalCases = (req, res) => {
  try {
    if (req.query.date == null || req.query.date == undefined) {
      throw new Error('Invalid date');
    }
    date = req.query.date;
    athenaDatabase.getTotalCases(date, function (err, result) {
      if (err !== null) {
        return res
          .status(500)
          .send({ message: `Could not get total cases ${date}:${err}` });
      }
      return res
        .status(200)
        .send({ message: 'Get total cases successfully', value: result });
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Serious error: Could not get total cases :${err}` });
  }
};

/* The location information of countries on the map: The latitude and longitude */
const getLocationOfCountry = (req, res) => {
  try {
    athenaDatabase.getLocationOfCountry(function (err, result) {
      if (err !== null) {
        return res.status(500).send({
          message: `Could not get locations of countries ${date}:${err}`,
        });
      }
      return res.status(200).send({
        message: 'Get locations of countries successfully',
        value: result,
      });
    });
  } catch (err) {
    return res.status(500).send({
      message: `Serious error: Could not get locations of countries :${err}`,
    });
  }
};


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
    dynamoDB.saveAccount(req.query.account, function (err, result) {
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

// =============== Bill ===================

const getTopTenByCase = (req,res) => {
  try {
    athenaDatabase.getTopTenByCase(function (err, result) {
      if (err !== null) {
        return res.status(500).send({
          message: `Could not get getTopTenByCase ${err}`,
        });
      }
      return res.status(200).send({
        message: 'getTopTenByCase successfully',
        value: result,
      });
    });
  } catch (err) {
    return res.status(500).send({
      message: `Serious error :${err}`,
    });
  }
}

const getTopTenByDeath = (req,res) => {
  try {
    athenaDatabase.getTopTenByDeath(function (err, result) {
      if (err !== null) {
        return res.status(500).send({
          message: `Could not getTopTenByDeath ${err}`,
        });
      }
      return res.status(200).send({
        message: 'getTopTenByDeath successfully',
        value: result,
      });
    });
  } catch (err) {
    return res.status(500).send({
      message: `Serious error :${err}`,
    });
  }
}


const getTotalCasesByIso = (req, res) => {
  try {
    const iso = req.query.iso;
    if (iso == null || iso == undefined) {
      throw new Error('Invalid isocode');
    }
    athenaDatabase.getTotalCasesByIsoCode(iso,function (err, result) {
        if (err !== null) {
          return res.status(500).send({
            message: `${err}`,
          });
        }
        return res.status(200).send({
          message: 'getTotalCasesByIso successfully',
          value: result,
        });
      }
    );
  } catch (err) {
    return res.status(500).send({
      message: `Serious error: Could not get data :${err}`,
    });
  }
};

/* Total deaths, cases in the world by month  ---including total deaths(or cases) per million
[see the field total_deaths_per_million, total_cases_per_million] */
const getTotalCaseByMonth = (req, res) => {
  try {
    const iso = req.query.iso;
    if (iso == null || iso == undefined) {
      throw new Error('Invalid isocode');
    }
    athenaDatabase.get12MonthByIso(iso,function (err, result) {
        if (err !== null) {
          return res.status(500).send({
            message: `${err}`,
          });
        }
        return res.status(200).send({
          message: 'get Total Case By Month successfully',
          value: result,
        });
      }
    );
  } catch (err) {
    return res.status(500).send({
      message: `Serious error: Could not get data :${err}`,
    });
  }
};

// ==========================================


module.exports = {
  getSummaryOfWorld,
  getTotalCases,
  getLocationOfCountry,
  getTotalCaseByMonth,
  queryByEmail,
  saveAccount,
  updatePassword,
  signInWithEmailAndPassword,
  signUp,
  getTotalCasesByIso,
  getTopTenByCase,
  getTopTenByDeath
};
