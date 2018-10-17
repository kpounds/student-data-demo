import React, { Component, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../app.css';

export default class Failures extends Component {
  state = {
    noFailuresAvg: null,
    oneFailureAvg: null,
    twoFailuresAvg: null,
    threeFailuresAvg: null,
    noFailuresNum: null,
    oneFailuresNum: null,
    twoFailuresNum: null,
    threeFailuresNum: null
  };

  componentDidMount() {
    axios({
      method: 'POST',
      url: '/api/DataTasks',
      data: {
        failures: true
      }
    })
      .then(res => {
        this.setState({
          noFailuresAvg: res.data.noFailures.average,
          oneFailureAvg: res.data.oneFailure.average,
          twoFailuresAvg: res.data.twoFailures.average,
          threeFailuresAvg: res.data.threeFailures.average,
          noFailuresNum: res.data.noFailures.numberOfStudents,
          oneFailuresNum: res.data.oneFailure.numberOfStudents,
          twoFailuresNum: res.data.twoFailures.numberOfStudents,
          threeFailuresNum: res.data.threeFailures.numberOfStudents
        });
      })
      .catch(err => {
        console.log('api error: ', err);
      });
  }

  render() {
    const {
      noFailuresAvg,
      oneFailureAvg,
      twoFailuresAvg,
      threeFailuresAvg,
      noFailuresNum,
      oneFailuresNum,
      twoFailuresNum,
      threeFailuresNum
    } = this.state;
    const barData = {
      labels: ['No Failures', '1 Failure', '2 Failures', '3 Failures'],
      datasets: [
        {
          label:
            'Average Grade Based on Past Failures (multiplied by 10 for better visual)',
          data: [
            parseFloat((noFailuresAvg * 10).toFixed(2)),
            parseFloat((oneFailureAvg * 10).toFixed(2)),
            parseFloat((twoFailuresAvg * 10).toFixed(2)),
            parseFloat((threeFailuresAvg * 10).toFixed(2))
          ],
          backgroundColor: 'rgba(0, 30, 210, 0.5)',
          borderColor: 'rgba(0, 30, 210, 1)',
          borderWidth: 1
        },
        {
          label: 'Number of Students in Failures Range',
          data: [
            parseFloat(noFailuresNum),
            parseFloat(oneFailuresNum),
            parseFloat(twoFailuresNum),
            parseFloat(threeFailuresNum)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(200, 25, 1, 0.5)',
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
            maintainAspectRatio: true,
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
