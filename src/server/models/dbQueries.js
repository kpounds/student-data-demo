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
      'SELECT g3 from students WHERE failures=0;SELECT g3 from students WHERE failures=1;SELECT g3 from students WHERE failures=2;SELECT g3 from students WHERE failures=3;',
      callback
    ),
  getFinalGradeByStudyTime: callback =>
    database.query(
      'SELECT g3 from students WHERE studytime=1;SELECT g3 from students WHERE studytime=2;SELECT g3 from students WHERE studytime=3;SELECT g3 from students WHERE studytime=4;',
      callback
    ),
  getFinalGradeByAbsences: callback =>
    database.query(
      'SELECT g3 from students WHERE absences=0;SELECT g3 from students WHERE absences > 0 AND absences <= 5;SELECT g3 from students WHERE absences > 5 AND absences <= 10;SELECT g3 from students WHERE absences > 10 AND absences <= 20;SELECT g3 from students WHERE absences > 20 AND absences <= 30;SELECT g3 from students WHERE absences > 30 AND absences <= 50;SELECT g3 from students WHERE absences > 50;',
      callback
    ),
  getFinalGradeByLifestyleHealth: callback =>
    database.query(
      'SELECT g3 from students WHERE health=1;SELECT g3 from students WHERE health=2;SELECT g3 from students WHERE health=3;SELECT g3 from students WHERE health=4;SELECT g3 from students WHERE health=5;SELECT g3 from students WHERE famrel=1;SELECT g3 from students WHERE famrel=2;SELECT g3 from students WHERE famrel=3;SELECT g3 from students WHERE famrel=4;SELECT g3 from students WHERE famrel=5;',
      callback
    ),
  getAllGradesByHealth: callback =>
    database.query(
      'SELECT g1, g2, g3 from students WHERE health=1;SELECT g1, g2, g3 from students WHERE health=2;SELECT g1, g2, g3 from students WHERE health=3;SELECT g1, g2, g3 from students WHERE health=4;SELECT g1, g2, g3 from students WHERE health=5;',
      callback
    )
};

module.exports = Data;
