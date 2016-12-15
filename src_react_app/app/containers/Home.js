import React from 'react';
import {
	Card
} from 'antd';

import HomeList from 'phr/containers/HomeList'
import Statistics from 'stat/containers/Statistics'
import QueueAnim from 'rc-queue-anim';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<QueueAnim delay={10}>
				<div className="survey" key="home">
					<Statistics/>
					<HomeList/>
				</div>
			</QueueAnim>
		)
	}
}