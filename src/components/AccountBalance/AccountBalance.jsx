import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const Balance = styled.div`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 1.5em;
    text-align: left;
`;

const Section = styled.section`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 3rem;
`;

const Button = styled.button`
    margin: 0 8px;
`;

const BalanceToggleButton = styled(Button)`
    width: 150px;
`;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
export default function AccountBalance (props) {

    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance'
    let content = '\u00A0'
    const buttonClass ='btn ' + (props.showBalance ? 'btn-info' : 'btn-warning')
    if(props.showBalance) {
        content = <>Balance: { formatter.format(props.amount) }</>
    }
    return (
        <>
            <Balance>{content}</Balance>
            <Section>
                <BalanceToggleButton onClick={props.handleBalanceVisibilityChange}
                        className={buttonClass}>{buttonText}</BalanceToggleButton>
                <Button className="btn btn-success" onClick={props.handleAirDrop}><i className="fas fa-parachute-box"></i></Button>   
            </Section>
        </>
    )
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}