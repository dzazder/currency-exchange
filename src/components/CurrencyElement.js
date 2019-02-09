import React, { Component } from 'react';

class CurrencyElement extends Component {
    
    render() {
        return(
            <span>{this.props.currency}<div className={"currency-flag currency-flag-" + this.props.currency.toLowerCase()}></div></span>
        );
    }
}

export default CurrencyElement;
