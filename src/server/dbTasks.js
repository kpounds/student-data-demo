const express = require('express');

const router = express.Router();
const Data = require('./models/dbQueries');

// utility function to get averages and send back a float number
function getAverage(apiData, index) {
  return (
    parseFloat(apiData[index].reduce((sum, current) => sum + current.g3, 0)) /
    apiData[index].length
  );
}

router.post('/:id?', (req, res) => {
  // switch here?
  if (req.body.internet) {
    Data.getFinalGradeByInternet((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const withoutInternet = getAverage(apiResponse, 0);
        const withInternet = getAverage(apiResponse, 1);
        res.json({
          withoutInternet: withoutInternet.toFixed(2),
          withInternet: withInternet.toFixed(2)
        });
      }
    });
  } else if (req.body.absences) {
    Data.getFinalGradeByAbsences((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const noAbsences = getAverage(apiResponse, 0);
        const oneToFiveAbsences = getAverage(apiResponse, 1);
        const sixToTenAbsences = getAverage(apiResponse, 2);
        const elevenToTwentyAbsences = getAverage(apiResponse, 3);
        const twentyOneToThirtyAbsences = getAverage(apiResponse, 4);
        const thirtyOneToFifty = getAverage(apiResponse, 5);
        const greaterThanFifty = getAverage(apiResponse, 6);
        res.json({
          noAbsences: {
            average: noAbsences.toFixed(2),
            numberOfStudents: apiResponse[0].length
          },
          oneTofiveAbsences: {
            average: oneToFiveAbsences.toFixed(2),
            numberOfStudents: apiResponse[1].length
          },
          sixToTenAbsences: {
            average: sixToTenAbsences.toFixed(2),
            numberOfStudents: apiResponse[2].length
          },
          elevenToTwentyAbsences: {
            average: elevenToTwentyAbsences.toFixed(2),
            numberOfStudents: apiResponse[3].length
          },
          twentyOneToThirtyAbsences: {
            average: twentyOneToThirtyAbsences.toFixed(2),
            numberOfStudents: apiResponse[4].length
          },
          thirtyOneToFiftyAbsences: {
            average: thirtyOneToFifty.toFixed(2),
            numberOfStudents: apiResponse[5].length
          },
          greaterThanFiftyAbsences: {
            average: greaterThanFifty.toFixed(2),
            numberOfStudents: apiResponse[6].length
          }
        });
      }
    });
  } else {
    res.send('There was no data sent!');
  }
});

module.exports = router;
