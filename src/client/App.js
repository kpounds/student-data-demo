import React, { Component } from 'react';
// import axios from 'axios';
import './app.css';

export default class App extends Component {
  state = { average: null };

  componentDidMount() {
    fetch('/api/DataTasks?internet=no')
      .then(res => res.json())
      .then(average => this.setState({ average }));
    // .then(grade => this.setState({ grades: grade.username }));
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
