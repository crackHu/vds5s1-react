import React from 'react';
import {
	Card
} from 'antd';
import {
	PieChart
} from 'react-d3-components';
import QueueAnim from 'rc-queue-anim';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var data = {
			label: 'somethingA',
			values: [{
				x: 'SomethingA',
				y: 10
			}, {
				x: 'SomethingB',
				y: 4
			}, {
				x: 'SomethingC',
				y: 3
			}]
		};

		var sort = null; // d3.ascending, d3.descending, func(a,b) { return a - b; }, etc...

		return (
			<QueueAnim delay={10}>
				<div key="home">
					<Card>
						<PieChart
			                data={data}
			                width={600}
			                height={400}
			                margin={{top: 10, bottom: 10, left: 100, right: 100}}
			                sort={sort}
			                />
					</Card>
				</div>
			</QueueAnim>
		);
	}
}