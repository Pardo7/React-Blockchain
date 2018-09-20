import React from 'react';
import WalletDetails from '../WalletDetails/WalletDetails';
import Transactions from '../Transactions/Transactions';
import style from './Profile.css';

class Profile extends React.Component {
	render() {
		let address;
		let balance;
		let txs;

		if (this.props.profileDetails === null) {
			return null;
		} else {
			address = this.props.profileDetails.address;
			balance = this.props.profileDetails.final_balance;
			txs = this.props.profileDetails.txs;
		}

		return (
			<div className={style.profile}>
				<WalletDetails balance={balance} address={address} />
				<Transactions txs={txs} />
			</div>
		);
	}
}

export default Profile;