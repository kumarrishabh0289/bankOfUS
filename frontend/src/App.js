import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import BankOfUsa from './components/Bank/BankOfUsa';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter/>*/}
        <BankOfUsa />
      </div>
    );
  }
}


export default App;