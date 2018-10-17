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
  // Could also do a switch statement here if more readable?
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
  } else if (req.body.failures) {
    Data.getFinalGradeByFailures((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const noFailuresAvg = getAverage(apiResponse, 0);
        const oneFailureAvg = getAverage(apiResponse, 1);
        const twoFailuresAvg = getAverage(apiResponse, 2);
        const threeFailuresAvg = getAverage(apiResponse, 3);
        res.json({
          noFailures: {
            average: noFailuresAvg.toFixed(2),
            numberOfStudents: apiResponse[0].length
          },
          oneFailure: {
            average: oneFailureAvg.toFixed(2),
            numberOfStudents: apiResponse[1].length
          },
          twoFailures: {
            average: twoFailuresAvg.toFixed(2),
            numberOfStudents: apiResponse[2].length
          },
          threeFailures: {
            average: threeFailuresAvg.toFixed(2),
            numberOfStudents: apiResponse[3].length
          }
        });
      }
    });
  } else if (req.body.studytime) {
    Data.getFinalGradeByStudyTime((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const lessThanTwoHoursAvg = getAverage(apiResponse, 0);
        const twoToFiveHoursAvg = getAverage(apiResponse, 1);
        const fiveToTenHoursAvg = getAverage(apiResponse, 2);
        const moreThenTenHoursAvg = getAverage(apiResponse, 3);
        res.json({
          lessThanTwoHours: {
            average: lessThanTwoHoursAvg.toFixed(2),
            numberOfStudents: apiResponse[0].length
          },
          twoToFiveHours: {
            average: twoToFiveHoursAvg.toFixed(2),
            numberOfStudents: apiResponse[1].length
          },
          fiveToTenHours: {
            average: fiveToTenHoursAvg.toFixed(2),
            numberOfStudents: apiResponse[2].length
          },
          moreThenTenHours: {
            average: moreThenTenHoursAvg.toFixed(2),
            numberOfStudents: apiResponse[3].length
          }
        });
      }
    });
  } else {
    res.send('There was no data sent!');
  }
});

module.exports = router;
