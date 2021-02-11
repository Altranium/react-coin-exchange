import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const CoinRow = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default function Coin(props) {

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

    const handleClick = (event) => {
        // Prevent the default action of submitting  the form
        event.preventDefault();

        props.handleRefresh(props.tickerId)
        
    }

    return (
        <tr>
            <CoinRow>{props.name}</CoinRow>
            <CoinRow>{props.ticker}</CoinRow>
            <CoinRow>${props.price}</CoinRow>
            {props.showBalance ? <CoinRow>${props.balance}</CoinRow> : null}
            <CoinRow>
                <form action="#" method="POST">
                <button onClick={handleClick}>Refresh</button>
                </form>
                
            </CoinRow>
        </tr> 
    )
}

Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}