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
// utility function to get averages that also takes a third parameter
// to functionally get average of values based on provided table column name
function getAverageByGrade(apiData, index, column) {
  return (
    parseFloat(
      apiData[index].reduce((sum, current) => sum + current[column], 0)
    ) / apiData[index].length
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
        const weekDayAlc1Avg = getAverage(apiResponse, 10);
        const weekDayAlc2Avg = getAverage(apiResponse, 11);
        const weekDayAlc3Avg = getAverage(apiResponse, 12);
        const weekDayAlc4Avg = getAverage(apiResponse, 13);
        const weekDayAlc5Avg = getAverage(apiResponse, 14);
        const weekEndAlc1Avg = getAverage(apiResponse, 15);
        const weekEndAlc2Avg = getAverage(apiResponse, 16);
        const weekEndAlc3Avg = getAverage(apiResponse, 17);
        const weekEndAlc4Avg = getAverage(apiResponse, 18);
        const weekEndAlc5Avg = getAverage(apiResponse, 19);
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
          },
          weekDayAlchConsAvgs: {
            veryLow: weekDayAlc1Avg.toFixed(2),
            low: weekDayAlc2Avg.toFixed(2),
            average: weekDayAlc3Avg.toFixed(2),
            high: weekDayAlc4Avg.toFixed(2),
            veryHigh: weekDayAlc5Avg.toFixed(2)
          },
          weekEndAlchConsAvgs: {
            veryLow: weekEndAlc1Avg.toFixed(2),
            low: weekEndAlc2Avg.toFixed(2),
            average: weekEndAlc3Avg.toFixed(2),
            high: weekEndAlc4Avg.toFixed(2),
            veryHigh: weekEndAlc5Avg.toFixed(2)
          }
        });
      }
    });
  } else if (req.body.traveltime) {
    Data.getFinalGradesByTravelTime((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const lessThanFifteenAvg = getAverage(apiResponse, 0);
        const fifteenToThirtyAvg = getAverage(apiResponse, 1);
        const ThirtyMinsToHourAvg = getAverage(apiResponse, 2);
        const greaterThanHourAvg = getAverage(apiResponse, 3);
        res.json({
          lessThanFifteenAvg: lessThanFifteenAvg.toFixed(2),
          fifteenToThirtyAvg: fifteenToThirtyAvg.toFixed(2),
          ThirtyMinsToHourAvg: ThirtyMinsToHourAvg.toFixed(2),
          greaterThanHourAvg: greaterThanHourAvg.toFixed(2)
        });
      }
    });
  } else if (req.body.allgradeshealth) {
    Data.getAllGradesByHealth((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const g1ByHealthLevelVeryPoorAvg = getAverageByGrade(
          apiResponse,
          0,
          'g1'
        );
        const g1ByHealthLevelPoorAvg = getAverageByGrade(apiResponse, 1, 'g1');
        const g1ByHealthLevelAverageAvg = getAverageByGrade(
          apiResponse,
          2,
          'g1'
        );
        const g1ByHealthLevelGoodAvg = getAverageByGrade(apiResponse, 3, 'g1');
        const g1ByHealthLevelExcellentAvg = getAverageByGrade(
          apiResponse,
          4,
          'g1'
        );
        const g2ByHealthLevelVeryPoorAvg = getAverageByGrade(
          apiResponse,
          0,
          'g2'
        );
        const g2ByHealthLevelPoorAvg = getAverageByGrade(apiResponse, 1, 'g2');
        const g2ByHealthLevelAverageAvg = getAverageByGrade(
          apiResponse,
          2,
          'g2'
        );
        const g2ByHealthLevelGoodAvg = getAverageByGrade(apiResponse, 3, 'g2');
        const g2ByHealthLevelExcellentAvg = getAverageByGrade(
          apiResponse,
          4,
          'g2'
        );
        const g3ByHealthLevelVeryPoorAvg = getAverageByGrade(
          apiResponse,
          0,
          'g3'
        );
        const g3ByHealthLevelPoorAvg = getAverageByGrade(apiResponse, 1, 'g3');
        const g3ByHealthLevelAverageAvg = getAverageByGrade(
          apiResponse,
          2,
          'g3'
        );
        const g3ByHealthLevelGoodAvg = getAverageByGrade(apiResponse, 3, 'g3');
        const g3ByHealthLevelExcellentAvg = getAverageByGrade(
          apiResponse,
          4,
          'g3'
        );
        res.json({
          g1AveragesByHealth: {
            g1VeryPoorAvg: g1ByHealthLevelVeryPoorAvg.toFixed(2),
            g1PoorAvg: g1ByHealthLevelPoorAvg.toFixed(2),
            g1AverageAvg: g1ByHealthLevelAverageAvg.toFixed(2),
            g1GoodAvg: g1ByHealthLevelGoodAvg.toFixed(2),
            g1ExcellentAvg: g1ByHealthLevelExcellentAvg.toFixed(2)
          },
          g2AveragesByHealth: {
            g2VeryPoorAvg: g2ByHealthLevelVeryPoorAvg.toFixed(2),
            g2PoorAvg: g2ByHealthLevelPoorAvg.toFixed(2),
            g2AverageAvg: g2ByHealthLevelAverageAvg.toFixed(2),
            g2GoodAvg: g2ByHealthLevelGoodAvg.toFixed(2),
            g2ExcellentAvg: g2ByHealthLevelExcellentAvg.toFixed(2)
          },
          g3AveragesByHealth: {
            g3VeryPoorAvg: g3ByHealthLevelVeryPoorAvg.toFixed(2),
            g3PoorAvg: g3ByHealthLevelPoorAvg.toFixed(2),
            g3AverageAvg: g3ByHealthLevelAverageAvg.toFixed(2),
            g3GoodAvg: g3ByHealthLevelGoodAvg.toFixed(2),
            g3ExcellentAvg: g3ByHealthLevelExcellentAvg.toFixed(2)
          }
        });
      }
    });
  } else {
    res.send('There was no data sent!');
  }
});

module.exports = router;
