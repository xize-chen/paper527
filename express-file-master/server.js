const cors = require('cors');
const express = require('express');
const getAllDataOfYesterday = require('./src/scheduledService');
const schedule = require('node-schedule');

// get s3
// const AWS = require('aws-sdk');

// AWS.config.update({ region: 'ap-southeast-2' });

// s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// var bucketParams = {
//   Bucket: 'tee1365testbucket',
//   Key: 'compx527/ba95bc7c-0fa7-4dc8-a2da-c216df82103a.csv',
// };

// // Call S3 to list the buckets
// s3.getObject(bucketParams, function (err, data) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     const body = Buffer.from(data.Body).toString('utf8');
//     console.log(body);
//   }
// });

const app = express();

global.__basedir = __dirname;
global.__uploadDir = __basedir + '/resources/static/assets/uploads/';

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

const initRoutes = require('./src/routes');

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
  // const job = schedule.scheduleJob('0 0 * * *', function () {
  //   console.log('The answer to life, the universe, and everything!');
  //   getAllDataOfYesterday();
  // });
  // const job = schedule.scheduleJob('0 * * * * *', function () {
  //   console.log('The answer to life, the universe, and everything!');
  //   getAllDataOfYesterday();
  // });
});
