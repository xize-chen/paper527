const NodeCache = require( "node-cache" );
const AthenaExpress = require('athena-express');
const AWS = require('aws-sdk');
const statements = require('./QueryStatement');
const moment = require('moment');
const debug = true ? `where date = '2021-09-14'` : '';


// pass region and s3 address
class AthenaDatabase {
  constructor() {
    AWS.config.update({ region: 'us-east-2' }); // <-- changed
    // AWS.config.update(awsCredentials); // <-- changed
    this.athenaExpress = new AthenaExpress({
      aws: AWS,
      s3: 's3://covid19-527', 
      getStats: false,
    });
    this.myCache = new NodeCache();
    const cacheInstance = this.myCache;
    const queryFun = this.query;

    const statement = `select date from world_cases_deaths_testing ${debug}
                    order by date desc limit 1`
    this.query(statement,
        function(err, result) {
            if (err ==null) {
                console.log(`====currentDate: ${JSON.stringify(result.Items[0].date)}`);
                cacheInstance.set('current_date', result);
            } else {
                console.error(`fail to query current date: ${err}`);
            }
        });
  }

  getCurrentDate() {
    if (this.myCache.has('current_date')) {
        return this.myCache.get('current_date').Items[0].date;
    }
    return moment(new Date()).format('YYYY-MM-DD');;
  }

  async query(statement, callback) {
    try {
       console.log(`statement: ${statement}`);
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
      // console.log(`${JSON.stringify(queryPara)}`);
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
  async getSummaryOfWorld(callback) {
    const varDate = this.getCurrentDate();
    this.query(statements.getTotalCaseWorldwide(varDate), callback);
  }

  /* Used for the map visualization of total cases at the specific time by location
  ---including ordering by group */
  async getTotalCases(date, callback) {
    this.query(statements.getTotalCaseByNow(date), callback);
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
    const varDate = this.getCurrentDate();
    this.query(statements.getAllDataOfYesterday(varDate), callback);
  }

  // bill =========================

  async getTopTenByCase(callback) {
    const varDate = this.getCurrentDate();
    this.query(
       `SELECT * FROM world_cases_deaths_testing
INNER JOIN country_codes ON world_cases_deaths_testing.iso_code=country_codes."alpha-3 code"
WHERE  iso_code NOT LIKE '%OWID_%' and date= '${varDate}'
ORDER BY total_deaths DESC LIMIT 10`
       , callback);

//     this.query(
//       `SELECT * FROM world_cases_deaths_testing
// INNER JOIN country_codes ON world_cases_deaths_testing.iso_code=country_codes."alpha-3 code"
// WHERE date= ${varDate} AND iso_code NOT LIKE '%OWID_%'
// ORDER BY total_deaths DESC LIMIT 10`
//       , callback);
  }

  async getTopTenByTests(callback) {
    const varDate = this.getCurrentDate();
    this.query(
       `SELECT * FROM world_cases_deaths_testing
 WHERE date= '${varDate}' AND iso_code NOT LIKE '%OWID_%'
 ORDER BY total_tests DESC LIMIT 10`
       , callback);
//     this.query(
//       `SELECT * FROM world_cases_deaths_testing
// INNER JOIN country_codes ON world_cases_deaths_testing.iso_code=country_codes."alpha-3 code"
// WHERE date= ${varDate} AND iso_code NOT LIKE '%OWID_%'
// ORDER BY total_tests DESC LIMIT 10`
//       , callback)
  }

  /* covid-19 situation for a country */
  async getTotalCasesByIsoCode(iso, callback) {
    const varDate = this.getCurrentDate();
    this.query(statements.getTotalCasesByIsoCode(iso,varDate), callback);
  }

  async get12MonthByIso(iso, callback) {
    const varDate = this.getCurrentDate();
    this.query(statements.get12MonthByIso(iso, varDate), callback);
  }
  // ========================
}

const AthenaDatabaseInstance = new AthenaDatabase();

module.exports = AthenaDatabaseInstance;
