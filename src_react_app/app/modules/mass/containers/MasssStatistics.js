import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { pieOptions } from '../echartData/chartOptions'
const echarts = require("echarts");
require('echarts/chart/pie');
require('echarts/component/tooltip');
require('echarts/component/title');
require('echarts/component/legend');
require('echarts/component/toolbox');

export default class MasssStatistics extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired,
	    select: React.PropTypes.func.isRequired,

	    isRefresh: React.PropTypes.bool.isRequired,
    };

    static defaultProps = {
    	data: {},
  	};

	constructor(props) {
    	super(props)
		this.state = {}
  	}

  	componentDidMount = () => {
  		this.props.select()
  	}

  	componentWillReceiveProps = (nextProps) => {
  		this.refreshData(nextProps)
	}

	refreshData = (props) => {
		const { data, isRefresh } = props
		if (data) {
			if (isRefresh)
				this.props.select()
			if (data !== this.props.data)
				this.drawChart(data)
		}
	}

	componentWillUpdate = (nextProps, nextState) => {
		console.log('udpateupdate', nextProps, nextState)
	}

  	drawChart = (data = this.props.data) => {
  		const myChart = echarts.init(document.getElementById('chart'))
  		let dd , wx, phone, total
  		let legendData = ['互联网', '健康档案', '钉钉用户', '微信用户', '手机用户'],
			seriesName = ['数据来源', '用户平台'],

			seriesData1 = [],
			seriesData = Object.keys(data).map(type => {
				const count = parseInt(data[type])
				switch (type) {
					case 'ding':
						dd = count
						if (dd != 0)
							seriesData1.push({
								value: dd,
								name: '钉钉用户',
				    			selected: true
							})
						break
					case 'wechat':
						wx = count
						if (wx != 0)
							seriesData1.push({
								value: wx,
								name: '微信用户'
							})
							break
					case 'phone':
						phone = count
						if (phone != 0)
							seriesData1.push({
								value: phone,
								name: '手机用户'
							})
						break
					case 'total':
						total = count
						break
				}
			}),
			internet = dd + wx,
			phr = phone,
			seriesData2 = []

			if (internet != 0)
				seriesData2.push({
					value: internet,
					name: '互联网',
					// selected: true
				})
			if (phr != 0)
				seriesData2.push({
					value: phr,
					name: '健康档案'
				})

		const options = pieOptions(legendData, seriesName, [seriesData1, seriesData2])
		console.debug('chart_option', options)
  		myChart.setOption(options)
  	}

  	render() {
  		return (
  			<div>
  				<div id="chart" style={{height: 500}}>
  					加载中…
  				</div>
  			</div>
  		)
  	}
}

