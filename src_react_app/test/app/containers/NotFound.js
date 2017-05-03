import React, {
	PropTypes
} from 'react'
import {
	Link,
	IndexLink
} from 'react-router'

/*404 NotFound*/
export default class NotFound extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: this.props.route.loggedIn == 0
		}
	}

	render() {

		let returnWord, style
		if (this.state.loggedIn) {
			returnWord = '登陆'
			style = {
				position: 'fixed'
			}
		} else {
			returnWord = '首页'
		}

		return (
			<div style={style} className="page-404">
				<section>
					<h1>404</h1>
					<p>
						你要找的页面不存在
						<IndexLink to="/"> 返回{returnWord}</IndexLink>
					</p>
				</section>
			</div>
		)
	}
}