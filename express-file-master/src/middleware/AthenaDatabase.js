const AthenaExpress = require('athena-express');
const AWS = require('aws-sdk');
const statements = require('./QueryStatement');

// const awsCredentials = {
//   region: 'ap-southeast-2',
//   accessKeyId: '', // TODO
//   secretAccessKey: '', // TODO
// };

class AthenaDatabase {
  constructor() {
    AWS.config.update({ region: 'ap-southeast-2' });
    this.athenaExpress = new AthenaExpress({
      aws: AWS,
      // s3: 's3://tee1365testbucket/compx527', //TODO
      s3: 's3://', //TODO
      getStats: true,
    });
  }

  async query(statement, callback) {
    try {
      if (callback == null) {
        throw new Error('callback must be set');
      }
      const results = await this.athenaExpress.query({
        sql: statement,
        db: 'covid-19',
      });
      callback(null, results);
    } catch (error) {
      console.log(error);
      callback(error, null);
    }
  }

  /* covid-19 situation worldwide: */
  async getSummaryOfWorld(date, callback) {
    this.query(statements.getTotalCaseWorldwide(date), callback);
  }

  /* Used for the map visualization of total cases at the specific time by location
  ---including ordering by group */
  async getTotalCases(date, callback) {
    this.query(statements.getTotalCaseByNow(date), callback);
  }

  async getTotalCasesByLocation(date, location, callback) {
    this.query(statements.getTotalCasesByLocation(date, location), callback);
  }

  /* The location information of countries on the map: The latitude and longitude */
  async getLocationOfCountry(callback) {
    this.query(statements.COUNTRY_LAT, callback);
  }

  /* Total deaths, cases in the world by month  ---including total deaths(or cases) per million
  [see the field total_deaths_per_million, total_cases_per_million] */
  async getTotalCaseByMonth(callback) {
    this.query(statements.TOTAL_CASES_BY_MONTH, callback);
  }
}

const AthenaDatabaseInstance = new AthenaDatabase();

module.exports = AthenaDatabaseInstance;

// Example about how to use this class
// const database = new AthenaDatabase();
// AthenaDatabaseInstance.getLocationOfCountry(function (err, results) {
//   console.log(`database.err: ${JSON.stringify(err)}`);
//   console.log(`database.result: ${JSON.stringify(results)}`);
// });
