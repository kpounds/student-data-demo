import React, { Component } from 'react';
import InternetAccess from './components/InternetAccess';
import './app.css';

class App extends Component {
  state = { showInternet: false };

  handleShowInternet = () => {
    const { showInternet } = this.state;
    return showInternet === false
      ? this.setState({ showInternet: true })
      : this.setState({ showInternet: false });
  };

  render() {
    const { showInternet } = this.state;
    return (
      <div>
        <h1>Hello Student!</h1>
        {showInternet && <InternetAccess />}
        <p>Select to view average grades by: </p>
        <button type="button" onClick={this.handleShowInternet}>
          Internet Access
        </button>
      </div>
    );
  }
}

export default App;
