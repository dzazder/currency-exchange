import React, { Component } from 'react';
import CurrencyDropdown from './CurrencyDropdown';
import CurrencyElement from './CurrencyElement';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

class AmountCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseCurrency: "EUR",
            resultCurrency: "PLN",
            toBuy: 10,
            result: null,
            error: null,
            isCalculating: false
        }

        this.checkRate = this.checkRate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.calculateResult = this.calculateResult.bind(this);
    }

    handleFieldChange(fieldId, value) {
        switch (fieldId) {
            case "currFrom": this.setState({ baseCurrency: value }); break;
            case "currTo": this.setState({ resultCurrency: value }); break;
            case "txtCurrTo": this.setState({ toBuy: value}); break;
        }
        this.setState({
            result: null
        });
    }    

    checkRate() {
        this.state.isCalculating = true;

        var url = "https://api.exchangeratesapi.io/latest?symbols=" + this.state.resultCurrency + "&base=" + this.state.baseCurrency;
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                isCalculating: false,
                result: data.rates[this.state.resultCurrency]   // todo add checking if resultCurrency exists in result data
            });
        },
        (error) => {
            this.setState({
                error: "Something went wrong",
                isCalculating: false
            });
            }
        )
    }

    calculateResult(val) {
        return Math.round(val * this.state.result * 1000) / 1000;
    }

    render() {
        let resultContainer;
        if (this.state.isCalculating) {
            resultContainer = <div>Calculating...</div>
        }
        else {
            resultContainer = 
            <div>
                <div>
                {this.state.result != null &&
                    <p>
                        <span>Exchange rate: </span>
                        <span>{this.state.result}</span>
                    </p>
                }
                </div>
                {this.state.result != null &&
                    <div>
                        You need: {this.calculateResult(this.state.toBuy)} <CurrencyElement currency={this.state.resultCurrency} />
                    </div>
                }
            </div>;
        }

        return(
            <div>
                <h3>Amount Calculator</h3>
                <div>
                    <span>I have: </span>
                    <CurrencyDropdown id="currFrom" onChange={this.handleFieldChange} selectedCurrency={this.state.baseCurrency} />
                    <span> and I want to buy:</span>
                    <TextField
                        id="txtCurrTo"
                        value={this.state.toBuy}
                        onChange={this.handleFieldChange}
                        margin="normal" />
                    <CurrencyDropdown id="currTo" onChange={this.handleFieldChange} selectedCurrency={this.state.resultCurrency} />
                    <Button variant="contained" color="primary" onClick={this.checkRate}>
                        Calculate
                    </Button>
                </div>
                {resultContainer}
            </div>
        );
    }
}

export default AmountCalculator;