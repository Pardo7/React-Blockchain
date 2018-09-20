/* Component: App.js
 	 Author: Pardo
	Purpose: Mediator component container in charge of submitting API requests,
	socket connections, and delegating property data out to child component views to render.
*/

import React, { Component } from 'react';
import style from './App.css';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';
import Pagination from './components/Pagination/Pagination';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			/**
			* A state property whos purpose is to maintiain state reference to the current active wallet address.
			*
			* @property activeWalletAddress
			* @type String
			* @default 1BoatSLRHtKNngkdXEeobR76b53LETtpyT
			*/
			activeWalletAddress: null,
			/**
			* A state property whos purpose is to maintiain all transaction data to an individual
			* wallet address.
			*
			* @property profileDetails
			* @type Object
			* @default null
			*/
			profileDetails: null,
			/**
			* A state property whos purpose is to maintiain all new incoming transaction
			* data emitted from our websocket connection.
			*
			* @property newTransactions
			* @type Object
			* @default null
			*/
			newTransactions: null
		};
	}
	/**
 	* Method which initializes a websocket connection wich subscribes
	* to new wallet transaction events.
	*
	* @method initSocketConnection
  */
	initSocketConnection() {
		// Creating WebSocket connection
		const socket = new WebSocket('wss://ws.blockchain.info/inv');

		// Connection opened. Subscribing to new transaction events
		socket.addEventListener('open', event => {
			const opMessage = {
				"op": "addr_sub",
				"addr": this.state.activeWalletAddress
			};

			console.log('Connected');
			socket.send(JSON.stringify(opMessage));
		});

		// Listen for messages
		socket.addEventListener('message', event => {
			console.log("Server Message");
			this.setState({ newTransactions: event.data.x });
		});
	}
	/**
	* Method which submits paginated api requests for blockchain data to
	* an individual wallet address.
	*
	* @method getAddressDataData
	* @param {String} address
	* @param {Number} offset
  */
	getAddressData(address = '1BoatSLRHtKNngkdXEeobR76b53LETtpyT', offset = 0) {
		const data = { address, offset };

		fetch('http://localhost:3000/api/data', {
			method: 'POST',
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(data => {
				this.setState({ profileDetails: data, activeWalletAddress: address });
				this.initSocketConnection();
			})
			.catch(err => {
				console.log(err);
			});
	}
	/**
	* Life Cycle callback which submits a request for wallet address data
	* once component has been appended to the dom.
	* @method componentDidMount
  */
	componentDidMount() {
		this.getAddressData();
	}
	/**
	* Helper method used to set the current active wallet address
	*
	* @method setActiveWalletAddress
	* @param {String} address
  */
	setActiveWalletAddress(address) {
		this.setState({ activeWalletAddress: address });
	}
	/**
	* Callback method used to request blockchain address data submitted
	* by the user through the search component.
	*
	* @method handleSearchWalletAddress
	* @param {String} address
  */
	handleSearchWalletAddress(address) {
		this.getAddressData(address);
	}
	/**
	* Callback method used to handle paginated requests
	* for subsequent pages of an individual blockchain wallet address
	*
	* @method handlePageChange
	* @param {Number} offset
  */
	handlePageChange(offset) {
		if (offset === undefined) {
			return;
		}
		const address = this.state.activeWalletAddress;
		this.getAddressData(address, offset);
	}

	render() {
		let nTrx;
		if (this.state.profileDetails === null) {
			return null;
		} else {
			nTrx = this.state.profileDetails.n_tx;
		}

		return (
			<div className="App">
				<div className={style.App}>
					<h1 className={style.header}>React Blockchain</h1>
					<Search searchWalletAddress={this.handleSearchWalletAddress.bind(this)} />
					<Profile profileDetails={this.state.profileDetails} newTransactions={this.state.newTransactions} />
					<Pagination
						numberOfItems={20}
						totalItems={nTrx}
						onChangePage={this.handlePageChange.bind(this)} />
					<div className={style.bg}></div>
					<div className={style.flare}></div>
				</div>
			</div>
		);
	}
}

export default App;