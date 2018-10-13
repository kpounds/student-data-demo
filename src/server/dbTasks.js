const express = require('express');

const router = express.Router();
const Data = require('./models/dbQueries');

router.post('/:id?', (req, res) => {
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
  } else {
    res.send('There was no data sent!');
  }
});

module.exports = router;
