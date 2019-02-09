import React, { Component } from 'react';
import './styles/App.css';

import CurrencyToCurrency from './components/CurrencyToCurrency';
import AmountCalculator from './components/AmountCalculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurrencyToCurrency />
        <AmountCalculator />
      </div>
    );
  }
}

export default App;
