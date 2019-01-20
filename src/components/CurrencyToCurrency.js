import React, { Component } from 'react';
import DICTIONARIES from '../const.js';
import CurrencyDropdown from './CurrencyDropdown';
import { Button } from '@material-ui/core';

class CurrencyToCurrency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseCurrency: "EUR",
            resultCurrency: "PLN",
            result: 0.00,
            error: null
        }

        this.checkRate = this.checkRate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(fieldId, value) {
        switch (fieldId) {
            case "currFrom": this.setState({ baseCurrency: value }); break;
            case "currTo": this.setState({ resultCurrency: value }); break;
        }
    }    

    checkRate() {
        var url = "https://api.exchangeratesapi.io/latest?symbols=" + this.state.resultCurrency + "&base=" + this.state.baseCurrency;
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                result: data.rates[this.state.resultCurrency]   // todo add checking if resultCurrency exists in result data
            });
        },
        (error) => {
            this.setState({
                error: "Something went wrong"
            });
            }
        )
    }

    render() {
        return(
            <div>
                <h3>Check the course</h3>
                <div>
                    <span>From: </span>
                    <CurrencyDropdown id="currFrom" onChange={this.handleFieldChange} selectedCurrency={this.state.baseCurrency} />
                    <span>To:</span>
                    <CurrencyDropdown id="currTo" onChange={this.handleFieldChange} selectedCurrency={this.state.resultCurrency} />
                    <Button variant="contained" color="primary" onClick={this.checkRate}>
                        Check the course
                    </Button>
                </div>
                <div>
                    <p>
                        <span>Result: </span>
                        {this.state.result}
                    </p>
                </div>
            </div>
        );
    }
}

export default CurrencyToCurrency; 