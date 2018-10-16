import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import InternetAccess from './components/InternetAccess';
import Absences from './components/Absences';
import './app.css';

class App extends Component {
  state = { showInternet: false, showAbsences: false };

  showInternet = () => {
    this.setState({ showInternet: true, showAbsences: false });
  };

  showAbsences = () => {
    this.setState({ showInternet: false, showAbsences: true });
  };

  render() {
    const { showInternet, showAbsences } = this.state;
    return (
      <div>
        <h1>Hello Student!</h1>
        <p>Select to view average grades by: </p>
        <ButtonGroup className="btnGroup">
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
        </ButtonGroup>
        {showInternet && <InternetAccess />}
        {showAbsences && <Absences />}
      </div>
    );
  }
}

export default App;
