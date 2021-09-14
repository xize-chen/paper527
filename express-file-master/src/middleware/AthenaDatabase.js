const NodeCache = require( "node-cache" );
const AthenaExpress = require('athena-express');
const AWS = require('aws-sdk');
const statements = require('./QueryStatement');

const awsCredentials = {
  region: 'us-east-2',
  accessKeyId: 'AKIARBHC2ZWD74JWZCX5', // TODO
  secretAccessKey: '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', // TODO
};

class AthenaDatabase {
  constructor() {
    // AWS.config.update({ region: 'ap-southeast-2' }); // <-- changed
    AWS.config.update(awsCredentials); // <-- changed
    this.athenaExpress = new AthenaExpress({
      aws: AWS,
      s3: 's3://covid-123', //TODO
      // s3: 's3://', //TODO
      getStats: true,
    });
    this.myCache = new NodeCache();
  }

  async query(statement, callback) {
    try {
      if (callback == null) {
        throw new Error('callback must be set');
      }
      let queryPara = {
                        sql: statement,
                        db: 'covid-19',
                      };
      if (this.myCache.has(statement)){
        queryPara = this.myCache.get(statement);
        return callback(null, queryPara);
      }
      const results = await this.athenaExpress.query(queryPara);
      if (!this.myCache .has(statement)){
        this.myCache.set(statement, results);
      }
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

  /* covid-19 situation for a country */
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

  async getAllDataOfYesterday(callback) {
    this.query(statements.getAllDataOfYesterday(), callback);
  }

  // bill =========================

  async getTopTenByCase(callback) {
    this.query(
      `SELECT * FROM world_cases_deaths_testing
INNER JOIN country_codes ON world_cases_deaths_testing.iso_code=country_codes."alpha-3 code"
WHERE to_date(date, 'yyyy-mm-dd') = current_date - interval '1' day AND iso_code NOT LIKE '%OWID_%'
ORDER BY total_cases DESC LIMIT 10`
      , callback);
  }

  async getTopTenByDeath(callback) {
    this.query(
      `SELECT * FROM world_cases_deaths_testing
INNER JOIN country_codes ON world_cases_deaths_testing.iso_code=country_codes."alpha-3 code"
WHERE to_date(date, 'yyyy-mm-dd') = current_date - interval '1' day AND iso_code NOT LIKE '%OWID_%'
ORDER BY total_deaths DESC LIMIT 10`
      , callback
    )
  }
  // ========================
}

const AthenaDatabaseInstance = new AthenaDatabase();

module.exports = AthenaDatabaseInstance;

// Example about how to use this class
// const database = new AthenaDatabase();
// AthenaDatabaseInstance.getLocationOfCountry(function (err, results) {
//   console.log(`database1.err: ${JSON.stringify(err)}`);
//   console.log('step2');
//   AthenaDatabaseInstance.getLocationOfCountry(function (err, results) {
//     console.log(`database2.err: ${JSON.stringify(err)}`);
//     // console.log(`database.result: ${JSON.stringify(results)}`);
//   });
//   // console.log(`database.result: ${JSON.stringify(results)}`);
// });
