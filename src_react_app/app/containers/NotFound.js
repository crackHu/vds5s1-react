import React, {
	PropTypes
} from 'react'

import {
	Link,
	IndexLink
} from 'react-router'

/*404 NotFound*/
export default class NotFound extends React.Component {

	render() {
		return (
			<div className="page-404">
				<section>
					<h1>404</h1>
					<p>
						你要找的页面不存在
						<IndexLink to="/">返回首页</IndexLink>
					</p>
				</section>
			</div>
		)
	}
}