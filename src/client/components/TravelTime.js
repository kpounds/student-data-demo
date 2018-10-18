import React, { Component, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../app.css';

export default class TravelTime extends Component {
  state = {
    lessThanFifteenAvg: null,
    fifteenToThirtyAvg: null,
    ThirtyMinsToHourAvg: null,
    greaterThanHourAvg: null
  };

  componentDidMount() {
    axios({
      method: 'POST',
      url: '/api/DataTasks',
      data: {
        traveltime: true
      }
    })
      .then(res => {
        console.log(res);
        this.setState({
          lessThanFifteenAvg: res.data.lessThanFifteenAvg,
          fifteenToThirtyAvg: res.data.fifteenToThirtyAvg,
          ThirtyMinsToHourAvg: res.data.ThirtyMinsToHourAvg,
          greaterThanHourAvg: res.data.greaterThanHourAvg
        });
      })
      .catch(err => {
        console.log('api error: ', err);
      });
  }

  render() {
    const {
      lessThanFifteenAvg,
      fifteenToThirtyAvg,
      ThirtyMinsToHourAvg,
      greaterThanHourAvg
    } = this.state;
    const barData = {
      labels: [
        'Less Than 15 Mins',
        '15 to 30 Mins',
        '30 Mins to 1 Hour',
        'More Than 1 Hour'
      ],
      datasets: [
        {
          label: 'Average Grade Based on Home to School Travel Time',
          data: [
            parseFloat(lessThanFifteenAvg),
            parseFloat(fifteenToThirtyAvg),
            parseFloat(ThirtyMinsToHourAvg),
            parseFloat(greaterThanHourAvg)
          ],
          backgroundColor: 'rgba(199, 150, 40, 0.5)',
          borderColor: 'rgba(199, 150, 40, 1)',
          borderWidth: 1
        }
      ]
    };
    return (
      <Fragment>
        <p>
          This visual shows a bar chart of average grade based on the travel
          time of students from their home to get to school.
        </p>
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
