import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DICTIONARIES from './const.js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class CurrencyDropdown extends Component {
    state = {
        selectedCurrency: null,
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        let currencies = DICTIONARIES.CURRENCIES;
        let optionItems = currencies.map((currency) =>
            <MenuItem key={currency.id} valuy={currency.id}>{currency.name}</MenuItem>);

        return(
            <Select
            value={this.state.selectedCurrency}
            onChange={this.handleChange}>
                {optionItems}
            </Select>
        );
    }
}

export default CurrencyDropdown;
