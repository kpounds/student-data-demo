import React, { Component, Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import '../app.css';

export default class LifestyleHealth extends Component {
  state = {
    veryPoorHealthAvg: null,
    poorHealthAvg: null,
    averageHealthAvg: null,
    goodHealthAvg: null,
    excellentHealthAvg: null,
    veryPoorFamAvg: null,
    poorFamAvg: null,
    averageFamAvg: null,
    goodFamAvg: null,
    excellentFamAvg: null
  };

  componentDidMount() {
    axios({
      method: 'POST',
      url: '/api/DataTasks',
      data: {
        lifehealth: true
      }
    })
      .then(res => {
        this.setState({
          veryPoorHealthAvg: res.data.healthLevelAvgs.veryPoor,
          poorHealthAvg: res.data.healthLevelAvgs.poor,
          averageHealthAvg: res.data.healthLevelAvgs.average,
          goodHealthAvg: res.data.healthLevelAvgs.good,
          excellentHealthAvg: res.data.healthLevelAvgs.excellent,
          veryPoorFamAvg: res.data.famLevelAvgs.veryPoor,
          poorFamAvg: res.data.famLevelAvgs.poor,
          averageFamAvg: res.data.famLevelAvgs.average,
          goodFamAvg: res.data.famLevelAvgs.good,
          excellentFamAvg: res.data.famLevelAvgs.excellent
        });
      })
      .catch(err => {
        console.log('api error: ', err);
      });
  }

  render() {
    const {
      veryPoorHealthAvg,
      poorHealthAvg,
      averageHealthAvg,
      goodHealthAvg,
      excellentHealthAvg,
      veryPoorFamAvg,
      poorFamAvg,
      averageFamAvg,
      goodFamAvg,
      excellentFamAvg
    } = this.state;
    const lineData = {
      labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
      datasets: [
        {
          label: 'Current Health Status',
          data: [
            parseFloat(veryPoorHealthAvg),
            parseFloat(poorHealthAvg),
            parseFloat(averageHealthAvg),
            parseFloat(goodHealthAvg),
            parseFloat(excellentHealthAvg)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(0, 170, 1, 0.8)',
          borderWidth: 1
        },
        {
          label: 'Quality of Family Relationships',
          data: [
            parseFloat(veryPoorFamAvg),
            parseFloat(poorFamAvg),
            parseFloat(averageFamAvg),
            parseFloat(goodFamAvg),
            parseFloat(excellentFamAvg)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(20, 89, 175, 0.8)',
          borderWidth: 1,
          type: 'line'
        }
      ]
    };
    return (
      <Fragment>
        <h4>Grade Averages Based on Overall Healthy Lifestyle</h4>
        <p>
          This graph shows multiple points of grade averages based on the
          quality of overall health and other variables that can effect healthy
          living and how it relates to the final average grade.
        </p>
        <Line
          data={lineData}
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
