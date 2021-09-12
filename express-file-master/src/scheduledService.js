const athenaDatabase = require('./middleware/AthenaDatabase');

const getAllDataOfYesterday = () => {
  try {
    athenaDatabase.getAllDataOfYesterday(function (err, result) {
      if (err !== null) {
        console.log(err);
      }
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getAllDataOfYesterday;
