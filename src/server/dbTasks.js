const express = require('express');

const router = express.Router();
const Data = require('./models/dbQueries');

router.post('/:id?', (req, res) => {
  // switch here?
  if (req.body.internet) {
    Data.getFinalGradeByInternet((err, apiResponse) => {
      if (err) {
        console.log('there was an error...', err);
        res.json(err);
      } else {
        const withoutInternet =
          parseFloat(
            apiResponse[0].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[0].length;
        const withInternet =
          parseFloat(
            apiResponse[1].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[1].length;
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
        const noAbsences =
          parseFloat(
            apiResponse[0].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[0].length;
        const oneToFiveAbsences =
          parseFloat(
            apiResponse[1].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[1].length;
        const sixToTenAbsences =
          parseFloat(
            apiResponse[1].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[1].length;
        const elevenToTwentyAbsences =
          parseFloat(
            apiResponse[2].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[2].length;
        const twentyOneToThirtyAbsences =
          parseFloat(
            apiResponse[3].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[3].length;
        const thirtyOneToFifty =
          parseFloat(
            apiResponse[4].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[4].length;
        const greaterThanFifty =
          parseFloat(
            apiResponse[5].reduce((sum, current) => sum + current.g3, 0)
          ) / apiResponse[5].length;
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
