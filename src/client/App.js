import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import InternetAccess from './components/InternetAccess';
import Absences from './components/Absences';
import Failures from './components/Failures';
import StudyTime from './components/StudyTime';
import './app.css';

class App extends Component {
  state = {
    showInternet: false,
    showAbsences: false,
    showFailures: false,
    showStudyTime: false
  };

  reset = () => {
    this.setState({
      showInternet: false,
      showAbsences: false,
      showFailures: false,
      showStudyTime: false
    });
  };

  showInternet = () => {
    this.setState({
      showInternet: true,
      showAbsences: false,
      showFailures: false,
      showStudyTime: false
    });
  };

  showAbsences = () => {
    this.setState({
      showInternet: false,
      showAbsences: true,
      showFailures: false,
      showStudyTime: false
    });
  };

  showFailures = () => {
    this.setState({
      showInternet: false,
      showAbsences: false,
      showFailures: true,
      showStudyTime: false
    });
  };

  showStudyTime = () => {
    this.setState({
      showInternet: false,
      showAbsences: false,
      showFailures: false,
      showStudyTime: true
    });
  };

  render() {
    const {
      showInternet,
      showAbsences,
      showFailures,
      showStudyTime
    } = this.state;
    return (
      <div>
        <h1>Welcome!</h1>
        <p>
          Select one of the following to view information about average grade
          statistics and how they are affected by different circumstances:
        </p>
        <div className="btnContainer">
          <div className="btnGroup">
            <Button
              bsStyle="primary"
              type="button"
              active={showInternet ? 'active' : null}
              block
              onClick={this.showInternet}
            >
              Internet Access
            </Button>
            <Button
              bsStyle="primary"
              type="button"
              active={showAbsences ? 'active' : null}
              block
              onClick={this.showAbsences}
            >
              Absences
            </Button>
          </div>
          <div className="btnGroup">
            <Button
              bsStyle="primary"
              type="button"
              active={showFailures ? 'active' : null}
              block
              onClick={this.showFailures}
            >
              Past Failures
            </Button>
            <Button
              bsStyle="primary"
              type="button"
              active={showStudyTime ? 'active' : null}
              block
              onClick={this.showStudyTime}
            >
              Study Time
            </Button>
          </div>
        </div>
        <div className="btnGroup">
          <Button onClick={this.reset} type="button" className="resetBtn">
            Reset
          </Button>
        </div>
        {showInternet && <InternetAccess />}
        {showAbsences && <Absences />}
        {showFailures && <Failures />}
        {showStudyTime && <StudyTime />}
      </div>
    );
  }
}

export default App;
