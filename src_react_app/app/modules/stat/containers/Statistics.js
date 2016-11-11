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
import echarts from 'echarts/lib/echarts'

// 引入柱状图
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
  // 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')

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
    if (prevProps.stat.per != this.props.stat.per || prevProps.stat.jqj != this.props.stat.jqj) {
      console.log("check in : 111111111111111111111111111111111111111111111111111")
      const {
        per,
        jqj
      } = this.props.stat
      console.log("check in : ", per, jqj)
      if (per) {
        const myChart = echarts.init(document.getElementById('pieChart'))
        const xData =
          [{
            value: parseInt(per["under"].substring(0, per["under"].length - 1)),
            name: '16周岁以下'
          }, {
            value: parseInt(per["between"].substring(0, per["between"].length - 1)),
            name: '16~60周岁'
          }, {
            value: parseInt(per["after"].substring(0, per["after"].length - 1)),
            name: '60周岁以上'
          }]
        const options = pieOptions('档案年龄百分比', xData)
        myChart.setOption(options)
      }

      if (jqj) {
        const myChart1 = echarts.init(document.getElementById('lineChart'))
        const seriesNames = ['建档记录']
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

    /* var data = [{
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
     }];*/
    return (
      <QueueAnim delay={10}>
        <div className='survey' key='statistics'>
        <Card>
          <div id="pieChart" style={{width: 550, height: 340}}></div>
        </Card>
        <Card>
          <div id="lineChart" style={{width: 600, height: 400}}></div>
        </Card>
        </div>
      </QueueAnim>
      /*<QueueAnim>
        <div className='survey' key="survey">
          <Card title='每日新增用户' style={{ width: 440 }}>
            <BarChart
                  data={data}
                  width={380}
                  height={300}
                  margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
          </Card>
          <Card title='每日新增用户' style={{ width: 440 }}>
            <BarChart
                  data={data}
                  width={380}
                  height={300}
                  margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
          </Card>
          <Card title='每日新增用户' style={{ width: 440 }}>
            <BarChart
                  data={data}
                  width={380}
                  height={300}
                  margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
          </Card>
          <Card title='每日新增用户' style={{ width: 440 }}>
            <BarChart
                  data={data}
                  width={380}
                  height={300}
                  margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
          </Card>
          
        </div>
      </QueueAnim>*/
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