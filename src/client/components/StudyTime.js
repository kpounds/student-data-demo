import React, { Component, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../app.css';

export default class StudyTime extends Component {
  state = {
    lessThanTwoHoursAvg: null,
    twoToFiveHoursAvg: null,
    fiveToTenHoursAvg: null,
    moreThenTenHoursAvg: null,
    lessThanTwoHoursNum: null,
    twoToFiveHoursNum: null,
    fiveToTenHoursNum: null,
    moreThenTenHoursNum: null
  };

  componentDidMount() {
    axios({
      method: 'POST',
      url: '/api/DataTasks',
      data: {
        studytime: true
      }
    })
      .then(res => {
        this.setState({
          lessThanTwoHoursAvg: res.data.lessThanTwoHours.average,
          twoToFiveHoursAvg: res.data.twoToFiveHours.average,
          fiveToTenHoursAvg: res.data.fiveToTenHours.average,
          moreThenTenHoursAvg: res.data.moreThenTenHours.average,
          lessThanTwoHoursNum: res.data.lessThanTwoHours.numberOfStudents,
          twoToFiveHoursNum: res.data.twoToFiveHours.numberOfStudents,
          fiveToTenHoursNum: res.data.fiveToTenHours.numberOfStudents,
          moreThenTenHoursNum: res.data.moreThenTenHours.numberOfStudents
        });
      })
      .catch(err => {
        console.log('api error: ', err);
      });
  }

  render() {
    const {
      lessThanTwoHoursAvg,
      twoToFiveHoursAvg,
      fiveToTenHoursAvg,
      moreThenTenHoursAvg,
      lessThanTwoHoursNum,
      twoToFiveHoursNum,
      fiveToTenHoursNum,
      moreThenTenHoursNum
    } = this.state;
    const barData = {
      labels: [
        'Less than 2 hours',
        '2 to five hours',
        '5 to 10 hours',
        'More than 10 hours'
      ],
      datasets: [
        {
          label:
            'Average Grade Based on Study Time (multiplied by 10 for better visual)',
          data: [
            parseFloat((lessThanTwoHoursAvg * 10).toFixed(2)),
            parseFloat((twoToFiveHoursAvg * 10).toFixed(2)),
            parseFloat((fiveToTenHoursAvg * 10).toFixed(2)),
            parseFloat((moreThenTenHoursAvg * 10).toFixed(2))
          ],
          backgroundColor: 'rgba(0, 150, 136, 0.5)',
          borderColor: 'rgba(0, 150, 136, 1)',
          borderWidth: 1
        },
        {
          label: 'Number of Students in Failures Range',
          data: [
            parseFloat(lessThanTwoHoursNum),
            parseFloat(twoToFiveHoursNum),
            parseFloat(fiveToTenHoursNum),
            parseFloat(moreThenTenHoursNum)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(233, 30, 99, 0.5)',
          type: 'line'
        }
      ]
    };
    return (
      <Fragment>
        <p>
          This visual shows a bar chart of average grade based on the time spent
          studying, and then a line chart for the number of students in each
          average range.
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
