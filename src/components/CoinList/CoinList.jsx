import React from 'react'
import Coin from '../Coin/Coin'

export default function CoinList(props) {
    return (
        <table className="coin-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
                {props.showBalance ? <th>Balance</th> : null}
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.coinData.map( ({key, name, ticker, balance, price}) => 
                        <Coin 
                            key={key}
                            handleRefresh={props.handleRefresh}
                            name={name}
                            ticker={ticker}
                            balance={balance}
                            price={price}
                            showBalance={props.showBalance}
                            tickerId={key} />
                    )
                }
            
            </tbody>
        </table>
    )
}
