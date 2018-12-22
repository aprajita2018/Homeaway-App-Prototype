import React, { Component } from 'react';
import logo from './calcLogo.jpeg';
import './App.css';
import  Calc from './components/CalculatorPage/calc';

//App Component
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Calculator demo</h1>
          <h2 className="App-title">*Powered by React and Express*</h2>
        </header>
        <Calc />
      </div>
    );
  }
}

export default App;
