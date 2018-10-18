import React, { Component, Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import '../app.css';

export default class AllGradesByHealth extends Component {
  state = {
    g1VeryPoorAvg: null,
    g1PoorAvg: null,
    g1AverageAvg: null,
    g1GoodAvg: null,
    g1ExcellentAvg: null,
    g2VeryPoorAvg: null,
    g2PoorAvg: null,
    g2AverageAvg: null,
    g2GoodAvg: null,
    g2ExcellentAvg: null,
    g3VeryPoorAvg: null,
    g3PoorAvg: null,
    g3AverageAvg: null,
    g3GoodAvg: null,
    g3ExcellentAvg: null
  };

  componentDidMount() {
    axios({
      method: 'POST',
      url: '/api/DataTasks',
      data: {
        allgradeshealth: true
      }
    })
      .then(res => {
        this.setState({
          g1VeryPoorAvg: res.data.g1AveragesByHealth.g1VeryPoorAvg,
          g1PoorAvg: res.data.g1AveragesByHealth.g1PoorAvg,
          g1AverageAvg: res.data.g1AveragesByHealth.g1GoodAvg,
          g1GoodAvg: res.data.g1AveragesByHealth.g1VeryPoorAvg,
          g1ExcellentAvg: res.data.g1AveragesByHealth.g1ExcellentAvg,
          g2VeryPoorAvg: res.data.g2AveragesByHealth.g2VeryPoorAvg,
          g2PoorAvg: res.data.g2AveragesByHealth.g2PoorAvg,
          g2AverageAvg: res.data.g2AveragesByHealth.g2GoodAvg,
          g2GoodAvg: res.data.g2AveragesByHealth.g2VeryPoorAvg,
          g2ExcellentAvg: res.data.g2AveragesByHealth.g2ExcellentAvg,
          g3VeryPoorAvg: res.data.g3AveragesByHealth.g3VeryPoorAvg,
          g3PoorAvg: res.data.g3AveragesByHealth.g3PoorAvg,
          g3AverageAvg: res.data.g3AveragesByHealth.g3GoodAvg,
          g3GoodAvg: res.data.g3AveragesByHealth.g3VeryPoorAvg,
          g3ExcellentAvg: res.data.g3AveragesByHealth.g3ExcellentAvg
        });
      })
      .catch(err => {
        console.log('api error: ', err);
      });
  }

  render() {
    const {
      g1VeryPoorAvg,
      g1PoorAvg,
      g1AverageAvg,
      g1GoodAvg,
      g1ExcellentAvg,
      g2VeryPoorAvg,
      g2PoorAvg,
      g2AverageAvg,
      g2GoodAvg,
      g2ExcellentAvg,
      g3VeryPoorAvg,
      g3PoorAvg,
      g3AverageAvg,
      g3GoodAvg,
      g3ExcellentAvg
    } = this.state;
    const lineData = {
      labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],

      datasets: [
        {
          label: 'Grade 1',
          data: [
            parseFloat(g1VeryPoorAvg * 10),
            parseFloat(g1PoorAvg * 10),
            parseFloat(g1AverageAvg * 10),
            parseFloat(g1GoodAvg * 10),
            parseFloat(g1ExcellentAvg * 10)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(0, 170, 1, 0.8)',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(0, 170, 1, 1)',
          type: 'line'
        },
        {
          label: 'Grade 2',
          data: [
            parseFloat(g2VeryPoorAvg * 10),
            parseFloat(g2PoorAvg * 10),
            parseFloat(g2AverageAvg * 10),
            parseFloat(g2GoodAvg * 10),
            parseFloat(g2ExcellentAvg * 10)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(55, 100, 210, 0.8)',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(55, 100, 210, 1)',
          type: 'line'
        },
        {
          label: 'Final Grade (G3)',
          data: [
            parseFloat(g3VeryPoorAvg * 10),
            parseFloat(g3PoorAvg * 10),
            parseFloat(g3AverageAvg * 10),
            parseFloat(g3GoodAvg * 10),
            parseFloat(g3ExcellentAvg * 10)
          ],
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: 'rgba(198, 30, 80, 0.8)',
          pointRadius: 5,
          pointBackgroundColor: 'rgba(198, 30, 80, 1)',
          type: 'line'
        }
      ]
    };
    return (
      <Fragment>
        <h4>G1, G2, and G3 Averages Based on Overall Health</h4>
        <p>
          This graph shows multiple points of grade averages based on the
          quality of overall health. There are 3 lines. One for Grade 1, Grade
          2, and Grade 3 (final).
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
        <p>Overall Quality of Health</p>
      </Fragment>
    );
  }
}
