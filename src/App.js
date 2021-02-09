import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Coin from './components/Coin/Coin';
import AccountBalance from './components/AccountBalance/AccountBalance';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [

        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: '9999.99'
        },
        {
          name: 'Ethereum',
          ticker: 'ETC',
          price: '299.99'
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: '1'
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          price: '0.2'
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-title">
            Coin Exchange
          </p>
        </header>
        <AccountBalance amount={this.state.balance} />
        <table className="coin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[0].ticker} price={this.state.coinData[0].price}/>
            <Coin name={this.state.coinData[1].name} ticker={this.state.coinData[1].ticker} price={this.state.coinData[1].price}/>
            <Coin name={this.state.coinData[2].name} ticker={this.state.coinData[2].ticker} price={this.state.coinData[2].price}/>
            <Coin name={this.state.coinData[3].name} ticker={this.state.coinData[3].ticker} price={this.state.coinData[3].price}/>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
