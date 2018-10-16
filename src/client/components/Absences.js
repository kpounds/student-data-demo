import React, { Component, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../app.css';

export default class Absences extends Component {
  state = {
    noAbsencesAvg: null,
    fiveAbsencesAvg: null,
    tenAbsencesAvg: null,
    twentyAbsencesAvg: null,
    thirtyAbsencesAvg: null,
    fiftyAbsencesAvg: null,
    moreAbsencesAvg: null,
    noAbsencesNum: null,
    fiveAbsencesNum: null,
    tenAbsencesNum: null,
    twentyAbsencesNum: null,
    thirtyAbsencesNum: null,
    fiftyAbsencesNum: null,
    moreAbsencesNum: null
  };

  componentDidMount() {
    axios({
      method: 'POST',
      url: '/api/DataTasks',
      data: {
        absences: true
      }
    })
      .then(res => {
        this.setState({
          noAbsencesAvg: res.data.noAbsences.average,
          fiveAbsencesAvg: res.data.oneTofiveAbsences.average,
          tenAbsencesAvg: res.data.sixToTenAbsences.average,
          twentyAbsencesAvg: res.data.elevenToTwentyAbsences.average,
          thirtyAbsencesAvg: res.data.twentyOneToThirtyAbsences.average,
          fiftyAbsencesAvg: res.data.thirtyOneToFiftyAbsences.average,
          moreAbsencesAvg: res.data.greaterThanFiftyAbsences.average,
          noAbsencesNum: res.data.noAbsences.numberOfStudents,
          fiveAbsencesNum: res.data.oneTofiveAbsences.numberOfStudents,
          tenAbsencesNum: res.data.sixToTenAbsences.numberOfStudents,
          twentyAbsencesNum: res.data.elevenToTwentyAbsences.numberOfStudents,
          thirtyAbsencesNum:
            res.data.twentyOneToThirtyAbsences.numberOfStudents,
          fiftyAbsencesNum: res.data.thirtyOneToFiftyAbsences.numberOfStudents,
          moreAbsencesNum: res.data.greaterThanFiftyAbsences.numberOfStudents
        });
      })
      .catch(err => {
        console.log('api error: ', err);
      });
  }

  render() {
    const {
      noAbsencesAvg,
      fiveAbsencesAvg,
      tenAbsencesAvg,
      twentyAbsencesAvg,
      thirtyAbsencesAvg,
      fiftyAbsencesAvg,
      moreAbsencesAvg,
      noAbsencesNum,
      fiveAbsencesNum,
      tenAbsencesNum,
      twentyAbsencesNum,
      thirtyAbsencesNum,
      fiftyAbsencesNum,
      moreAbsencesNum
    } = this.state;
    const barData = {
      labels: [
        'No Absences',
        '1 to 5 Absences',
        '6 to 10 Absences',
        '11 to 20 Absences',
        '21 to 30 Absences',
        '31 to 50 Absences',
        'Greater Than 50 Absences'
      ],
      datasets: [
        {
          label: 'Average Grade Based on Absences',
          data: [
            parseFloat(noAbsencesAvg),
            parseFloat(fiveAbsencesAvg),
            parseFloat(tenAbsencesAvg),
            parseFloat(twentyAbsencesAvg),
            parseFloat(thirtyAbsencesAvg),
            parseFloat(fiftyAbsencesAvg),
            parseFloat(moreAbsencesAvg)
          ],
          backgroundColor: 'rgba(0, 128, 1, 0.5)',
          borderColor: 'rgba(0, 128, 1, 1)',
          borderWidth: 1
        },
        {
          label: 'Number of Students in Absence Range',
          data: [
            parseFloat(noAbsencesNum),
            parseFloat(fiveAbsencesNum),
            parseFloat(tenAbsencesNum),
            parseFloat(twentyAbsencesNum),
            parseFloat(thirtyAbsencesNum),
            parseFloat(fiftyAbsencesNum),
            parseFloat(moreAbsencesNum)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(200, 128, 1, 0.5)',
          type: 'line'
        }
      ]
    };
    return (
      <Fragment>
        <Bar
          data={barData}
          width={100}
          height={20}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </Fragment>
    );
  }
}
