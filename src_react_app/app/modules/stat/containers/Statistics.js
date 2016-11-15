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

    const columns = [{
      title: '个人编号',
      width: 100,
      dataIndex: 'grbh',
      key: 'grbh'
    }, {
      title: '性别',
      dataIndex: 'grda_xb',
      key: 'grda_xb',
      width: 100
    }, {
      title: '地址',
      width: 100,
      dataIndex: 'address',
      key: 'address'
    }, {
      title: '本人电话',
      dataIndex: 'grda_brdh',
      key: 'grda_brdh',
      width: 100
    }, {
      title: '联系人电话',
      dataIndex: 'grda_lxrdh',
      key: 'grda_lxrdh',
      width: 100
    }, {
      title: '疾病标签',
      dataIndex: 'label',
      key: 'label',
      width: 100
    }, ];


    return (
      //<QueueAnim delay={10}>
      <div className='survey' key='statistics'>
          <Card>
            <div id="pieChart" style={{width: 550, height: 340}}></div>
          </Card>
          <Card>
            <div id="lineChart" style={{width: 600, height: 400}}></div>
          </Card>
        </div>
      //</QueueAnim>
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