/* Component: Profile.js
 	 Author: Pardo
	 Purpose: Child component whos purpose is to handle and
	 submit pagination oriented requests back up to the parent mediator component
	 wallet search API.
*/

import React from 'react';
import style from './Pagination.css';
import PropTypes from 'prop-types';

const propTypes = {
	onChangePage: PropTypes.func.isRequired,
	initialPage: PropTypes.number,
	pageSize: PropTypes.number
}

const defaultProps = {
	initialPage: 1,
	pageSize: 10
}

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pager: {}
		};
	}
	/**
	* Life Cycle callback which sets the internal state page property
	* upon receiving valid property values.
	* @method componentWillMount
  */
	componentWillMount() {
		// set page if numberOfItems & totalItems props are valid
		if (this.props.numberOfItems && this.props.totalItems) {
			this.setPage(this.props.initialPage);
		}
	}
	/**
	* Life Cycle callback which sets the internal state properties
	* upon receiving newly updated valid property values.
	* @method componentDidUpdate
  */
	componentDidUpdate(prevProps, prevState) {
		// reset page if items array has changed
		if (this.props.numberOfItems !== prevProps.numberOfItems) {
			this.setPage(this.props.initialPage);
		}
	}
	/**
	* Method which sets the pagers initial properties and
	* updates the pager state.
	*
	* @method setPage
	* @param {Number} page
  */
	setPage(page) {
		let { numberOfItems, totalItems } = this.props;
		let pager = this.state.pager;

		if (page < 1 || page > pager.totalPages) {
			return;
		}

		pager = this.getPager(totalItems, page, numberOfItems);

		// generate an Offset integer for subsequent page requests.
		let pageOfItems = pager.endIndex + 1;

		// update state
		this.setState({ pager: pager });

		// call change page function in parent component
		this.props.onChangePage(pageOfItems);
	}
	/**
	* Method which sets the pagers properties associated to the
	* selected page, the total number of items being rendered
	* along with the total number of items, in order to generate
	* additional pages for user selection.
	*
	* @method getPager
	* @param {Number} totalItems
	* @param {Number} currentPage
	* @param {Number} pageSize
  */
	getPager(totalItems, currentPage, pageSize) {
		currentPage = currentPage || 1;
		pageSize = pageSize || 10;

		let totalPages = Math.ceil(totalItems / pageSize);
		let startPage, endPage;

		if (totalPages <= 10) {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}

		// calc start and end item indexes
		let startIndex = (currentPage - 1) * pageSize;
		let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		// array of pages to map and render
		let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

		return {
			totalItems: totalItems,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			startPage: startPage,
			endPage: endPage,
			startIndex: startIndex,
			endIndex: endIndex,
			pages: pages
		};
	}

	render() {
		let pager = this.state.pager;

		if (!pager.pages || pager.pages.length <= 1) {
			return null;
		}

		return (
			<div className="pagination">
				<ul className={style.pagination}>
					<li className={pager.currentPage === 1 ? 'disabled' : ''}>
						<a onClick={() => this.setPage(1)}>First</a>
					</li>
					<li className={pager.currentPage === 1 ? 'disabled' : ''}>
						<a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
					</li>
					{pager.pages.map((page, index) =>
						<li key={index} className={pager.currentPage === page ? style.active : ''}>
							<a onClick={() => this.setPage(page)}>{page}</a>
						</li>
					)}
					<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
						<a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
					</li>
					<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
						<a onClick={() => this.setPage(pager.totalPages)}>Last</a>
					</li>
				</ul>
			</div>
		);
	}
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;