import React, { Component } from 'react';
import DICTIONARIES from '../const.js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../styles/currency-flags.min.css';
import CurrencyElement from './CurrencyElement';

class CurrencyDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCurrency: props.selectedCurrency,   // 33 = EUR
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ selectedCurrency: event.target.value });
        this.props.onChange(this.props.id, event.target.value);
    };

    render() {
        let currencies = DICTIONARIES.CURRENCIES;
        let optionItems = currencies.map((c) =>
            <MenuItem key={c.id} value={c.name}>
                <CurrencyElement currency={c.name} />
            </MenuItem>);

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
