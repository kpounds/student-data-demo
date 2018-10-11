const database = require('../connection');

const Data = {
  getAllData: callback => database.query('SELECT * from students', callback),
  getFinalGradeByInternet: (internet, callback) =>
    database.query(
      'SELECT g3 from students WHERE internet=?',
      [internet],
      callback
    )
};

module.exports = Data;
