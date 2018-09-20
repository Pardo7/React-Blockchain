import React, { Component } from 'react';
import style from './Search.css'

class Search extends Component {
	constructor() {
		super();
		this.state = {
			searchAddress: null
		};
		this.inputSearch = React.createRef();
	}


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