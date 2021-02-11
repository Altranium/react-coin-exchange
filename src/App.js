import React, { Component } from 'react';
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import axios from 'axios';

const COIN_COUNT = 10;

const formatPrice = price => parseFloat(Number(price).toFixed(2));
class App extends Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [
      /*
      {
        name: 'Bitcoin',
        ticker: 'BTC',
        balance: 0.5,
        price: 9999.99
      },
      {
        name: 'Ethereum',
        ticker: 'ETC',
        balance: 32.0,
        price: 299.99
      },
      {
        name: 'Tether',
        ticker: 'USDT',
        balance: 0,
        price: 1
      },
      {
        name: 'Ripple',
        ticker: 'XRP',
        balance: 1000,
        price: 0.2
      },
      {
        name: 'Bitcoin Cash',
        ticker: 'BCH',
        balance: 0,
        price: 298.99
      },
      */
    ]
  }

  componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    const coinIds = response.data.slice(0, COIN_COUNT).map( coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key:  coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance:  0,
        price:  formatPrice(coin.quotes.USD.price),
      };
    });
    // Retrieves the price
    this.setState({ coinData: coinPriceData });
  }

  handleRefresh = async (valueChangeTickerId) => {
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/' + valueChangeTickerId;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = this.state.coinData.map( function(values) {
      let newValues = {...values}
      if (valueChangeTickerId === values.key ) {
        newValues.price = newPrice
      }
      return newValues
    });
    this.setState({ coinData: newCoinData })
  }

  handleBalanceVisibilityChange = () => {
    this.setState( function(oldState) {
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AccountBalance 
          amount={this.state.balance}
          showBalance={this.state.showBalance}
          handleBalanceVisibilityChange={this.handleBalanceVisibilityChange} />
        <CoinList 
          coinData={this.state.coinData}
          handleRefresh={this.handleRefresh} 
          showBalance={this.state.showBalance}
          />
      </div>
    );
  }
}

export default App;
