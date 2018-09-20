import React, { Component } from 'react';
import style from './Transactions.css';
import sb from 'satoshi-bitcoin';

class Transactions extends Component {
	render() {
		let transactions = this.props.txs;

		if (!transactions) {
			return null;
		}

		return (
			<div className={style.transactions}>
				<h2 className={style.header}>Transactions</h2>
				{transactions.map((txn, index) =>
					<div className={style.txns}>
						<p key={index}>{txn.inputs[0].prev_out.addr_tag || txn.inputs[0].prev_out.addr}</p>
						<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(120, 200, 255, 0.8)" width="24" height="24" viewBox="0 0 24 24">
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
						</svg>
						<p key={index + 1}>{txn.out[0].addr}</p>
						<p key={index + 2}>{sb.toBitcoin(txn.out[0].value)} BTC</p>
					</div>
				)}
			</div>
		);
	}
}

export default Transactions;