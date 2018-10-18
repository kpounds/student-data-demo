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
  } else if (req.body.lifehealth) {
    Data.getFinalGradeByLifestyleHealth((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const healthLevel1Avg = getAverage(apiResponse, 0);
        const healthLevel2Avg = getAverage(apiResponse, 1);
        const healthLevel3Avg = getAverage(apiResponse, 2);
        const healthLevel4Avg = getAverage(apiResponse, 3);
        const healthLevel5Avg = getAverage(apiResponse, 4);
        const famLevel1Avg = getAverage(apiResponse, 5);
        const famLevel2Avg = getAverage(apiResponse, 6);
        const famLevel3Avg = getAverage(apiResponse, 7);
        const famLevel4Avg = getAverage(apiResponse, 8);
        const famLevel5Avg = getAverage(apiResponse, 9);
        res.json({
          healthLevelAvgs: {
            veryPoor: healthLevel1Avg.toFixed(2),
            poor: healthLevel2Avg.toFixed(2),
            average: healthLevel3Avg.toFixed(2),
            good: healthLevel4Avg.toFixed(2),
            excellent: healthLevel5Avg.toFixed(2)
          },
          famLevelAvgs: {
            veryPoor: famLevel1Avg.toFixed(2),
            poor: famLevel2Avg.toFixed(2),
            average: famLevel3Avg.toFixed(2),
            good: famLevel4Avg.toFixed(2),
            excellent: famLevel5Avg.toFixed(2)
          }
        });
      }
    });
  } else {
    res.send('There was no data sent!');
  }
});

module.exports = router;
