const locationWorld = 'world';
const dateFormat = 'yyyy-mm-dd';
const orderByMonth = '01';

const getTotalCaseWorldwide = (
  searchDate
) => `SELECT location,date,total_cases,total_deaths,
      round((total_deaths * 1.0) / total_cases, 2) as percent_death_confirm,
      new_cases,new_deaths,iso_code,total_cases_per_million,new_cases_per_million,
      total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,
      total_tests_per_thousand,new_tests_per_thousand,tests_units
      FROM world_cases_deaths_testing
      WHERE LOWER(location)='${locationWorld}' and to_date(date, '${dateFormat}') <= to_date('${searchDate}', '${dateFormat}')
      order by date desc
      limit 1`;

// 2. The map for visualising total cases at the specific time by location---including ordering by group
const getTotalCaseByNow = (
  searchDate
) => `SELECT date,location,total_cases,total_deaths,new_cases,new_deaths,iso_code,
      total_cases_per_million,new_cases_per_million,total_deaths_per_million,
      new_deaths_per_million,total_tests,new_tests,total_tests_per_thousand,
      new_tests_per_thousand,tests_units
      FROM world_cases_deaths_testing
      WHERE LOWER(location) <> '${locationWorld}' and to_date(date, '${dateFormat}') = to_date('${searchDate}', '${dateFormat}')`;

// 3. The location information of countries on the map: The latitude and longitude
const COUNTRY_LAT = `SELECT country, latitude, longitude
      FROM country_codes`;

// 4. Total deaths, cases in the world by month  ---including total deaths(or cases) per million
//    [see the field total_deaths_per_million, total_cases_per_million]
const TOTAL_CASES_BY_MONTH = `SELECT date,location,total_deaths,total_cases,new_cases,
         new_deaths,iso_code,total_cases_per_million,new_cases_per_million,
         total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,
         total_tests_per_thousand,new_tests_per_thousand,tests_units
      FROM world_cases_deaths_testing
      WHERE LOWER(location) ='${locationWorld}'
              AND SUBSTRING(date, -2, 2) = '${orderByMonth}'
      order by date asc`;

const getTotalCasesByLocation = (
  searchDate,
  location
) => `SELECT location,date,total_cases,total_deaths,
round((total_deaths * 1.0) / total_cases, 2) as percent_death_confirm,
new_cases,new_deaths,iso_code,total_cases_per_million,new_cases_per_million,
total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,
total_tests_per_thousand,new_tests_per_thousand,tests_units
FROM world_cases_deaths_testing
WHERE LOWER(location)='${location}' and to_date(date, '${dateFormat}') <= to_date('${searchDate}', '${dateFormat}')
order by date desc
limit 1`;

const getAllDataOfYesterday = () => `SELECT date,
location,
total_cases,
total_deaths,
new_cases,
new_deaths,
iso_code,
total_cases_per_million,
new_cases_per_million,
total_deaths_per_million,
new_deaths_per_million,
total_tests,
new_tests,
total_tests_per_thousand,
new_tests_per_thousand,
tests_units
FROM world_cases_deaths_testing
WHERE to_date(date, '${dateFormat}') = current_date - interval '1' day
ORDER BY  location ASC`;

// const job = schedule.scheduleJob('0 12 * * *', function () {
//   console.log('The answer to life, the universe, and everything!');
// });

module.exports = {
  getTotalCaseWorldwide,
  getTotalCaseByNow,
  COUNTRY_LAT,
  TOTAL_CASES_BY_MONTH,
  getTotalCasesByLocation,
  getAllDataOfYesterday,
};
