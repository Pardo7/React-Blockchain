import React, { Component } from 'react';
import style from './WalletDetails.css'
import sb from 'satoshi-bitcoin';

class WalletDetails extends Component {
	render() {
		return (
			<div className={style.wallet_details}>
				<h2 className={style.header}>Address: {this.props.address}</h2>
				<h2 className={style.header}>Balance: {sb.toBitcoin(this.props.balance || '')} BTC</h2>
			</div>
		);
	}
}

export default WalletDetails;