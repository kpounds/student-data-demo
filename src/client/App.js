import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import InternetAccess from './components/InternetAccess';
import Absences from './components/Absences';
import Failures from './components/Failures';
import StudyTime from './components/StudyTime';
import LifestyleHealth from './components/LifestyleHealth';
import './app.css';

class App extends Component {
  state = {
    showInternet: false,
    showAbsences: false,
    showFailures: false,
    showStudyTime: false,
    showHealth: false
  };

  reset = () => {
    this.setState({
      showInternet: false,
      showAbsences: false,
      showFailures: false,
      showStudyTime: false,
      showHealth: false
    });
  };

  showInternet = () => {
    this.setState({
      showInternet: true,
      showAbsences: false,
      showFailures: false,
      showStudyTime: false,
      showHealth: false
    });
  };

  showAbsences = () => {
    this.setState({
      showInternet: false,
      showAbsences: true,
      showFailures: false,
      showStudyTime: false,
      showHealth: false
    });
  };

  showFailures = () => {
    this.setState({
      showInternet: false,
      showAbsences: false,
      showFailures: true,
      showStudyTime: false,
      showHealth: false
    });
  };

  showStudyTime = () => {
    this.setState({
      showInternet: false,
      showAbsences: false,
      showFailures: false,
      showStudyTime: true,
      showHealth: false
    });
  };

  showHealth = () => {
    this.setState({
      showInternet: false,
      showAbsences: false,
      showFailures: false,
      showStudyTime: false,
      showHealth: true
    });
  };

  render() {
    const {
      showInternet,
      showAbsences,
      showFailures,
      showStudyTime,
      showHealth
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
              active={showInternet}
              block
              onClick={this.showInternet}
            >
              Internet Access
            </Button>
            <Button
              bsStyle="primary"
              type="button"
              active={showAbsences}
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
              active={showFailures}
              block
              onClick={this.showFailures}
            >
              Past Failures
            </Button>
            <Button
              bsStyle="primary"
              type="button"
              active={showStudyTime}
              block
              onClick={this.showStudyTime}
            >
              Study Time
            </Button>
          </div>
          <div className="btnGroup">
            <Button
              bsStyle="primary"
              type="button"
              active={showHealth}
              block
              onClick={this.showHealth}
            >
              Health & Lifestyles
            </Button>
            <Button
              bsStyle="primary"
              type="button"
              active={showStudyTime}
              block
              onClick={this.showStudyTime}
            >
              Travel Time
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
        {showHealth && <LifestyleHealth />}
      </div>
    );
  }
}

export default App;
