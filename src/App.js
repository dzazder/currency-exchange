import React, { Component } from 'react';
import './styles/App.css';

import CurrencyDropdown from './CurrencyDropdown';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurrencyDropdown />
      </div>
    );
  }
}

export default App;
