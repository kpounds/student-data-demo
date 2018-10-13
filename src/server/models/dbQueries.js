const database = require('../connection');

const Data = {
  getAllData: callback => database.query('SELECT * from students', callback),
  getFinalGradeByInternet: callback =>
    database.query(
      'SELECT g3 from students WHERE internet="no"; SELECT g3 from students WHERE internet="yes"',
      callback
    )
};

module.exports = Data;
