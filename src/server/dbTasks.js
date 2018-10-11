const express = require('express');
const router = express.Router();
const Data = require('./models/dbQueries');

router.get('/:id?', function(req, res, next) {
  if (req.query.internet) {
    Data.getFinalGradeByInternet(req.query.internet, function(
      err,
      apiResponse
    ) {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const hasInternet = req.query.internet === 'yes' ? 'with' : 'without';
        let grades = [];
        apiResponse.map(data => {
          grades.push(data.g3);
        });
        let sum = 0;
        for (var i = 0; i < grades.length; i++) {
          sum += grades[i];
        }
        const average = Number(sum / grades.length).toFixed(2);
        res.send(
          `<p>The total average final grade of students ${hasInternet} internet is: ${average}</p>`
        );
      }
    });
  } else {
    res.send("you didn't send any parameters!");
  }
});

module.exports = router;
