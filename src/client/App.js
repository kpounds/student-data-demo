import React, { Component } from 'react';
import axios from 'axios';
import './app.css';

export default class App extends Component {
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
    return (
      <div>
        <h1>Hello Student!</h1>
        <div>{`Average without internet: ${averageWithout}`}</div>
        <div>{`Average with internet: ${averageWith}`}</div>
      </div>
    );
  }
}
