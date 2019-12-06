import React, { Component } from 'react';

import AgCloud from './components/AgCloud/AgCloud'
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter/>*/}
        <AgCloud />
      </div>
    );
  }
}


export default App;