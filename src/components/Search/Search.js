/* Component: Search.js
 	 Author: Pardo
	 Purpose: Child component whos purpose is to handle rendering and submitting search
	 for individual wallet addresses.
*/

import React, { Component } from 'react';
import style from './Search.css'

class Search extends Component {
	constructor() {
		super();
		this.state = {
			/**
			* A state property whos purpose is to maintiain state reference to
			* the most recently submitted search wallet address.
			*
			* @property searchAddress
			* @type String
			* @default null
			*/
			searchAddress: null
		};
		/**
		* A property whos purpose is to maintiain an active reference
		* to the user input
		*
		* @property inputSearch
		* @type String
		* @default null
		*/
		this.inputSearch = React.createRef();
	}
	/**
 	* Callback method used to authenticate and handle searches for individual
	* wallet addresses.
	*
	* @method handleSubmit
	* @param {event}
  */
	handleSubmit(e) {
		console.log(this.inputSearch.current.value);
		if (this.inputSearch.current.value === '') {
			alert('Empty Field');
		} else {
			this.setState({ searchAddress: this.inputSearch.current.value }, () => {
				this.props.searchWalletAddress(this.state.searchAddress);
			});
		}
		e.preventDefault();
	}

	render() {
		return (
			<div className={style.container}>
				<form className={style.form} onSubmit={this.handleSubmit.bind(this)}>
					<input className={style.header} type="text" ref={this.inputSearch} placeholder="Wallet Address" />
					<input className={style.button} type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Search;