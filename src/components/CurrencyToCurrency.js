import React, { Component } from 'react';
import CurrencyDropdown from './CurrencyDropdown';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class CurrencyToCurrency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseCurrency: "EUR",
            resultCurrency: "PLN",
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
        var rows = [
            {"base": 1, "result": this.calculateResult(1)},
            {"base": 5, "result": this.calculateResult(5)},
            {"base": 10, "result": this.calculateResult(10)},
            {"base": 100, "result": this.calculateResult(100)},
            {"base": 1000, "result": this.calculateResult(1000)}
        ];

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
                        <span>Result: </span>
                        <span>{this.state.result}</span>
                    </p>
                }
                </div>
                {this.state.result != null &&
                    <div>
                        <Table style={{ width: 400, margin: "0 auto" }}>
                            <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.base}>
                                    <TableCell align="right">{row.base} {this.state.baseCurrency}</TableCell>
                                    <TableCell align="left">{row.result} {this.state.resultCurrency}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                }
            </div>;
        }

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
                {resultContainer}
            </div>
        );
    }
}

export default CurrencyToCurrency; 