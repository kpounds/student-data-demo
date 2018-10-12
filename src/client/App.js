import React, { Component } from 'react';
import axios from 'axios';
import './app.css';

export default class App extends Component {
  state = { average: null };

  componentDidMount() {
    axios.get('/api/DataTasks?internet=no').then(res => {
      const average = res.data;
      return this.setState({ average });
    });
  }

  render() {
    const { average } = this.state;
    return (
      <div>
        <h1>Hello Student!</h1>
        <div>{`The Average grade is: ${average}`}</div>
      </div>
    );
  }
}
