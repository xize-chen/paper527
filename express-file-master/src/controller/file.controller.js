const athenaDatabase = require('../middleware/AthenaDatabase');

/* covid-19 situation worldwide: */
const getSummaryOfWorld = (req, res) => {
  try {
    // if (req.query.date == null || req.query.date == undefined) {
    //   throw new Error('Invalid date');
    // }
    // date = req.query.date;
    athenaDatabase.getSummaryOfWorld(function (err, result) {
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

const getTopTenByTests = (req,res) => {
  try {
    athenaDatabase.getTopTenByTests(function (err, result) {
      if (err !== null) {
        return res.status(500).send({
          message: `Could not getTopTenByTests ${err}`,
        });
      }
      return res.status(200).send({
        message: 'getTopTenByTests successfully',
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
      throw new Error('Invalid location');
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
  getTotalCasesByIso,
  getTopTenByCase,
  getTopTenByTests
};
