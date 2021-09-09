const athenaDatabase = require("../middleware/AthenaDatabase");

/* covid-19 situation worldwide: */
const getSummaryOfWorld = (req, res) => {
  try {
    if (req.query.date == null || req.query.date == undefined) {
        throw new Error("Invalid date");
    }
    date = req.query.date;
    athenaDatabase.getSummaryOfWorld(date, function (err, result) {
      if (err !== null) {
        return res
          .status(500)
          .send({ message: `Could not get summary information ${date}:${err}` });
      }
      return res
        .status(200)
        .send({ message: "Get summary information successfully", value: result });
    });
  } catch (err) {
    return res.status(500).send({ message: `Serious error: Could not get summary information :${err}` });
  }
}

/* Used for the map visualization of total cases at the specific time by location
---including ordering by group */
const getTotalCases = (req, res) => {
  try {
    if (req.query.date == null || req.query.date == undefined) {
        throw new Error("Invalid date");
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
        .send({ message: "Get total cases successfully", value: result });
    });
  } catch (err) {
    return res.status(500).send({ message: `Serious error: Could not get total cases :${err}` });
  }
}


/* The location information of countries on the map: The latitude and longitude */
const getLocationOfCountry = (req, res) => {
  try {
    athenaDatabase.getLocationOfCountry(function (err, result) {
      if (err !== null) {
        return res
          .status(500)
          .send({ message: `Could not get locations of countries ${date}:${err}` });
      }
      return res
        .status(200)
        .send({ message: "Get locations of countries successfully", value: result });
    });
  } catch (err) {
    return res.status(500).send({ message: `Serious error: Could not get locations of countries :${err}` });
  }
}

/* Total deaths, cases in the world by month  ---including total deaths(or cases) per million
[see the field total_deaths_per_million, total_cases_per_million] */
const getTotalCaseByMonth = (req, res) => {
  try {
    athenaDatabase.getTotalCaseByMonth(function (err, result) {
      if (err !== null) {
        return res
          .status(500)
          .send({ message: `Could not get total cases by month ${date}:${err}` });
      }
      return res
        .status(200)
        .send({ message: "Get total cases by month successfully", value: result });
    });
  } catch (err) {
    return res.status(500).send({ message: `Serious error: Could not get total cases by month :${err}` });
  }
}

module.exports = {
  getSummaryOfWorld,
  getTotalCases,
  getLocationOfCountry,
  getTotalCaseByMonth
};
