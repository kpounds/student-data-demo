const express = require('express');

const router = express.Router();
const Data = require('./models/dbQueries');

router.get('/:id?', (req, res) => {
  console.log('req', req.query);
  if (req.query.internet) {
    Data.getFinalGradeByInternet(req.query.internet, (err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const grades = [];
        let i = 0;
        apiResponse.map(data => grades.push(data.g3));
        let sum = 0;
        for (i = 0; i < grades.length; i += 1) {
          sum += grades[i];
        }
        const average = Number(sum / grades.length).toFixed(2);
        res.json(average);
      }
    });
  } else {
    res.send("you didn't send any parameters!");
  }
});

module.exports = router;
