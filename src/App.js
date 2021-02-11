import React, { useState, useEffect } from 'react';
import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import axios from 'axios';

const COIN_COUNT = 10;

const formatPrice = price => parseFloat(Number(price).toFixed(2));
function App (props) {

  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
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
    setCoinData(coinPriceData);
  }

  useEffect( function() {
    if(coinData.length === 0) {
      // component did mount
      componentDidMount();
    } else {
      // component did update
    }
  })

  const handleRefresh = async (valueChangeTickerId) => {
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/' + valueChangeTickerId;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map( function(values) {
      let newValues = {...values}
      if (valueChangeTickerId === values.key ) {
        newValues.price = newPrice
      }
      return newValues
    });
    setCoinData(newCoinData)
  }

  const handleBalanceVisibilityChange = () => {
    setShowBalance(oldValue => !oldValue);
  }

    return (
      <div className="App">
        <Header />
        <AccountBalance 
          amount={balance}
          showBalance={showBalance}
          handleBalanceVisibilityChange={handleBalanceVisibilityChange} />
        <CoinList 
          coinData={coinData}
          handleRefresh={handleRefresh} 
          showBalance={showBalance}
          />
      </div>
    );
}

export default App;
