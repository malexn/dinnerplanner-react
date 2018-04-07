import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <p id="wtext">
            Welcome to the dinner planner React Startup code SUPER AWESOME!
        </p>
        <div id="wbutton" >
          <Link to="/search">
            <button className="btn btn-primary center-block">Start planning</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
