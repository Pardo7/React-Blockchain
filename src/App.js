import React, { Component } from 'react';
import style from './App.css';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';
import Pagination from './components/Pagination/Pagination';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeWalletAddress: null,
			profileDetails: null,
			newTransactions: null
		};
	}

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
			this.setState({newTransactions: event.data.x});
		});
	}

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

	componentDidMount() {
		this.getAddressData();
	}

	setActiveWalletAddress(address) {
		this.setState({ activeWalletAddress: address });
	}

	handleSearchWalletAddress(address) {
		this.getAddressData(address);
	}

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
					<Profile profileDetails={this.state.profileDetails} newTransactions={this.state.newTransactions}/>
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