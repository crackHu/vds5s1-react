import React, {
  PropTypes
} from 'react';
import {
  Button,
  Card
} from 'antd';
import {
  connect
} from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import * as STATAction from '../STATAction'
import {
  lineOptions
} from '../echartData/chartOptions'
import {
  pieOptions
} from '../echartData/chartOptions'
// import echarts from 'echarts/lib/echarts'
const echarts = require("echarts");

// 引入柱状图
// require('echarts/lib/chart/line')
// require('echarts/lib/chart/pie')
require('echarts/chart/line');
require('echarts/chart/pie');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/toolbox')
require('echarts/component/tooltip');
require('echarts/component/title');
require('echarts/component/legend');
require('echarts/component/toolbox');

class Statistics extends React.Component {


  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getAgePercent()
    this.props.getJqjds()
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stat.per != this.props.stat.per) {
      const {
        per
      } = this.props.stat
      if (per) {
        const myChart = echarts.init(document.getElementById('pieChart'))
        const xData =
          [{
            value: per["under"],
            name: '16周岁以下'
          }, {
            value: per["between"],
            name: '16~60周岁'
          }, {
            value: per["after"],
            name: '60周岁以上'
          }]
        const options = pieOptions('档案年龄百分比', xData)
        myChart.setOption(options)
      }
    }

    if (prevProps.stat.jqj != this.props.stat.jqj) {
      const {
        jqj
      } = this.props.stat
      if (jqj) {
        const myChart1 = echarts.init(document.getElementById('lineChart'))
        const seriesNames = ['']
        const series = Reflect.ownKeys(jqj).map((key) => {
          return jqj[key]
        })
        const xData1 = Reflect.ownKeys(jqj).map((key) => {
            return key
          })
          //const series = [[120, 132, 101, 134, 90, 230, 210]]
          //const xData1 = ['2016-10-01','2016-10-02','2016-10-03','2016-10-04','2016-10-05']
        const options1 = lineOptions(xData1, seriesNames, [series], '近期建档数')
        myChart1.setOption(options1)
      }
    }
  }

  render() {

    return (
      <QueueAnim delay={10}>
        <div className='survey' key='statistics'>
          <Card style={{ width: 570 }}>
            <div id="pieChart" style={{height: 350}}></div>
          </Card>
          <Card style={{ width: 570 }}>
            <div id="lineChart" style={{height: 350}}></div>
          </Card>
        </div>
      </QueueAnim>
    )
  }
}

Statistics.propTypes = {
  getAgePercent: PropTypes.func.isRequired,
  getJqjds: PropTypes.func.isRequired,
  stat: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    stat: state.stat
  }
}

export default connect(mapStateToProps, STATAction)(Statistics)