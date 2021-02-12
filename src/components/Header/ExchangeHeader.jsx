import React, { Component } from 'react'
import coin from './coin.svg';
import styled from 'styled-components'

const Img = styled.img`
    height: 8rem;
    pointer-events: none;
    margin: 0 0 0 20px;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: white;
`;

const Title = styled.h1`
    font-size: 4rem;
    line-height: 8rem;
    fold-weight: bold;
    min-width:300px;
`;

export default class ExchangeHeader extends Component {
    render() {
        return (
            <Header className="App-header">
                <Img src={coin} className="App-logo" alt="logo" />
                <Title>Coinsim</Title>
            </Header>
            
        )
    }
}
