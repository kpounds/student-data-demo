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
    excellentFamAvg: null,
    veryLowWeekDayAlcohol: null,
    lowWeekDayAlcohol: null,
    averageWeekDayAlcohol: null,
    highWeekDayAlcohol: null,
    veryHighWeekDayAlcohol: null,
    veryLowWeekEndAlcohol: null,
    lowWeekEndAlcohol: null,
    averageWeekEndAlcohol: null,
    highWeekEndAlcohol: null,
    veryHighWeekEndAlcohol: null
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
          excellentFamAvg: res.data.famLevelAvgs.excellent,
          veryLowWeekDayAlcohol: res.data.weekDayAlchConsAvgs.veryLow,
          lowWeekDayAlcohol: res.data.weekDayAlchConsAvgs.low,
          averageWeekDayAlcohol: res.data.weekDayAlchConsAvgs.average,
          highWeekDayAlcohol: res.data.weekDayAlchConsAvgs.high,
          veryHighWeekDayAlcohol: res.data.weekDayAlchConsAvgs.veryHigh,
          veryLowWeekEndAlcohol: res.data.weekEndAlchConsAvgs.veryLow,
          lowWeekEndAlcohol: res.data.weekEndAlchConsAvgs.low,
          averageWeekEndAlcohol: res.data.weekEndAlchConsAvgs.average,
          highWeekEndAlcohol: res.data.weekEndAlchConsAvgs.high,
          veryHighWeekEndAlcohol: res.data.weekEndAlchConsAvgs.veryHigh
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
      excellentFamAvg,
      veryLowWeekDayAlcohol,
      lowWeekDayAlcohol,
      averageWeekDayAlcohol,
      highWeekDayAlcohol,
      veryHighWeekDayAlcohol,
      veryLowWeekEndAlcohol,
      lowWeekEndAlcohol,
      averageWeekEndAlcohol,
      highWeekEndAlcohol,
      veryHighWeekEndAlcohol
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
          pointRadius: 5,
          pointBackgroundColor: 'rgba(0, 170, 1, 1)',
          type: 'line'
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
          borderColor: 'rgba(55, 100, 210, 0.8)',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(55, 100, 210, 1)',
          type: 'line'
        },
        {
          label: 'Weekday Alcohol Consumption',
          data: [
            parseFloat(veryHighWeekDayAlcohol),
            parseFloat(highWeekDayAlcohol),
            parseFloat(averageWeekDayAlcohol),
            parseFloat(lowWeekDayAlcohol),
            parseFloat(veryLowWeekDayAlcohol)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(198, 30, 80, 0.8)',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(198, 30, 80, 1)',
          type: 'line'
        },
        {
          label: 'Weekend Alcohol Consumption',
          data: [
            parseFloat(veryHighWeekEndAlcohol),
            parseFloat(highWeekEndAlcohol),
            parseFloat(averageWeekEndAlcohol),
            parseFloat(lowWeekEndAlcohol),
            parseFloat(veryLowWeekEndAlcohol)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(20, 20, 20, 0.8)',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(20, 20, 20, 1)',
          type: 'line'
        }
      ]
    };
    return (
      <Fragment>
        <h4>Grade Averages Based on Overall Health & Lifestyles</h4>
        <p>
          This graph shows multiple points of grade averages based on the
          quality of overall health and other variables that can effect healthy
          living and how it relates to the final average grade. For Alcohol
          consumption both on the weekdays and weekends, very poor is measured
          by more alcohol and excellent is measured by less alcohol.
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
        <p>Quality of Health & Lifestyle</p>
      </Fragment>
    );
  }
}
