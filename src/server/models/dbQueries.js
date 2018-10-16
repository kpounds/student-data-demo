const database = require('../connection');

const Data = {
  getAllData: callback => database.query('SELECT * from students', callback),
  getFinalGradeByInternet: callback =>
    database.query(
      'SELECT g3 from students WHERE internet="no"; SELECT g3 from students WHERE internet="yes"',
      callback
    ),
  getFinalGradeByFailures: callback =>
    database.query(
      'SELECT g3 from students WHERE failures=0;SELECT g3 from students WHERE failures=1;SELECT g3 from students WHERE failures=2;SELECT g3 from students WHERE failures=3;SELECT g3 from students WHERE failures=4;',
      callback
    ),
  getFinalGradeByAbsences: callback =>
    database.query(
      'SELECT g3 from students WHERE absences=0;SELECT g3 from students WHERE absences > 0 AND absences <= 5;SELECT g3 from students WHERE absences > 5 AND absences <= 10;SELECT g3 from students WHERE absences > 10 AND absences <= 20;SELECT g3 from students WHERE absences > 20 AND absences <= 30;SELECT g3 from students WHERE absences > 30 AND absences <= 50;SELECT g3 from students WHERE absences > 50;',
      callback
    )
};

module.exports = Data;
