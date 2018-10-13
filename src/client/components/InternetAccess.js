import React, { Component, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../app.css';

export default class InternetAccess extends Component {
  state = { averageWith: null, averageWithout: null };

  componentDidMount() {
    axios({
      method: 'POST',
      url: '/api/DataTasks',
      data: {
        internet: true
      }
    })
      .then(res => {
        this.setState({
          averageWith: res.data.withInternet,
          averageWithout: res.data.withoutInternet
        });
      })
      .catch(err => {
        console.log('api error: ', err);
      });
  }

  render() {
    const { averageWith, averageWithout } = this.state;
    const barData = {
      labels: ['With Internet', 'Without Internet'],
      datasets: [
        {
          label: 'Average grade based on internet access',
          data: [parseFloat(averageWith), parseFloat(averageWithout)],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
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
        <div>{`Average with internet: ${averageWith}`}</div>
        <div>{`Average without internet: ${averageWithout}`}</div>
      </Fragment>
    );
  }
}
