import React, { Component } from 'react';
import './styles/App.css';

import CurrencyToCurrency from './components/CurrencyToCurrency';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurrencyToCurrency />
      </div>
    );
  }
}

export default App;
