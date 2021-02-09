import React, { Component } from 'react';
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [

        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETC',
          price: 299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: 1
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          price: 0.2
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          price: 298.99
        }
      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map( function({ticker, name, price}) {
      let newPrice = price
      if (valueChangeTicker == ticker ) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage
      }
      return {
        ticker,
        name,
        price: newPrice
      }
    });
    this.setState({ coinData: newCoinData })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AccountBalance amount={this.state.balance} />
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} />
      </div>
    );
  }
}

export default App;
