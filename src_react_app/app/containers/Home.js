import React from 'react';
import {
	Card
} from 'antd';
import {
	PieChart,
	AreaChart,
	LineChart,
} from 'react-d3-components';
import HomeList from '../modules/phr/containers/HomeList'
import QueueAnim from 'rc-queue-anim';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var data = {
			label: 'somethingA',
			values: [{
				x: '16周岁以下',
				y: 12
			}, {
				x: '16~60周岁',
				y: 1
			}, {
				x: '60周岁以上',
				y: 7
			}]
		};

		var sort = null; // d3.ascending, d3.descending, func(a,b) { return a - b; }, etc...

		var data1 = [{
			label: 'somethingA',
			values: [{
				x: 0,
				y: 2
			}, {
				x: 1.3,
				y: 5
			}, {
				x: 3,
				y: 6
			}, {
				x: 3.5,
				y: 6.5
			}, {
				x: 4,
				y: 6
			}, {
				x: 4.5,
				y: 6
			}, {
				x: 5,
				y: 7
			}, {
				x: 5.5,
				y: 8
			}]
		}, {
			label: 'somethingB',
			values: [{
				x: 0,
				y: 3
			}, {
				x: 1.3,
				y: 4
			}, {
				x: 3,
				y: 7
			}, {
				x: 3.5,
				y: 8
			}, {
				x: 4,
				y: 7
			}, {
				x: 4.5,
				y: 7
			}, {
				x: 5,
				y: 7.8
			}, {
				x: 5.5,
				y: 9
			}]
		}]

		var data3 = {
			label: 'ssssssss',
			values: [{
				x: new Date(2016, 9, 11),
				y: 11
			}, {
				x: new Date(2016, 9, 12),
				y: 18
			}, {
				x: new Date(2016, 9, 13),
				y: 12
			}, {
				x: new Date(2016, 9, 15),
				y: 10
			}, {
				x: new Date(2016, 9, 16),
				y: 22
			}, {
				x: new Date(2016, 9, 17),
				y: 18
			}, {
				x: new Date(2016, 9, 18),
				y: 8
			}, {
				x: new Date(2016, 9, 19),
				y: 40
			}, {
				x: new Date(2016, 9, 20),
				y: 24
			}, {
				x: new Date(2016, 9, 21),
				y: 20
			}],
		}

		var xScale = d3.time.scale().domain([new Date(2016, 9, 11), new Date(2016, 9, 21)]).range([0, 550 - 70])

		return (
			<QueueAnim delay={10}>
		<div className="survey" key="home">
					<Card title="档案年龄百分比">
						<PieChart
			                data={data}
			                width={550}
			                height={340}
			                margin={{top: 10, bottom: 10, left: 100, right: 100}}
			                sort={sort}
			            />
					</Card>
					{/*<Card>
			            <AreaChart
			                data={data1}
			                width={600}
			                height={400}
			                yOrientation='left' // if you do not provide right default left orientation for yAxis will be used 
			                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
					</Card>*/}
					<Card title="近期建档数">
			            <LineChart
		                   data={data3}
		                   width={550}
		                   height={340}
		                   margin={{top: 10, bottom: 50, left: 50, right: 20}}
		                   xScale={xScale}
		                   xAxis={{tickValues: xScale.ticks(d3.time.day, 1), tickFormat: d3.time.format("%m/%d")}}
		                />
					</Card>
					<Card title="建档记录">
						<HomeList/>
					</Card>
				</div>
			</QueueAnim>
		);
	}
}