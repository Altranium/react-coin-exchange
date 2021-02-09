import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const CoinRow = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default class Coin extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    // Runs when component is loaded onto the DOM
    // componentDidMount() {
    //     const callback = () => {
    //         // set the state to a new random value
    //         const randomPercentage = 0.995 + Math.random() * 0.01;

    //         this.setState( function(oldState) {
    //             return {
    //                 price: oldState.price * randomPercentage
    //             }
    //         });
    //     }
    //     setInterval(callback, 1000);
    // }

    handleClick(event) {
        // Prevent the default action of submitting  the form
        event.preventDefault();

        this.props.handleRefresh(this.props.ticker)
        
    }

    render() {
        return (
            <tr>
              <CoinRow>{this.props.name}</CoinRow>
              <CoinRow>{this.props.ticker}</CoinRow>
              <CoinRow>${this.props.price}</CoinRow>
              {this.props.showBalance ? <CoinRow>${this.props.balance}</CoinRow> : null}
              <CoinRow>
                  <form action="#" method="POST">
                    <button onClick={this.handleClick}>Refresh</button>
                  </form>
                  
              </CoinRow>
            </tr> 
        )
    }
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}