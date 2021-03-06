/* Component: NewTransactions.js
 	 Author: Pardo
	 Purpose: Child component in charge of rendering and displaying newly added
	 wallet transaction data to an already rendered wallet address.
*/

import React, { Component } from 'react';
import style from './NewTransactions.css';
import sb from 'satoshi-bitcoin';

class NewTransactions extends Component {
	render() {
		let transactions;
		if (this.props.newTransactions === null) {
			return null;
		} else {
			transactions = this.props.newTransactions.txs;
		}

		return (
			<div className={style.transactions}>
				<h2 className={style.header}>New Transactions</h2>
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

export default NewTransactions;