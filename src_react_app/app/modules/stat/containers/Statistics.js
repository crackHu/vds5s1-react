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
import {
  Table,
} from 'antd';
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
    this.props.queryForAdd(1, 10)
    this.props.queryForUpdate(1, 10)
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stat.per != this.props.stat.per || prevProps.stat.jqj != this.props.stat.jqj) {

      const {
        per,
        jqj
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
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left'
    }, {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left'
    }, {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150
    }, {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150
    }, {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150
    }, {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150
    }, {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150
    }, {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150
    }, {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150
    }, {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8'
    }, {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a href="#">action</a>,
    }, ];

    const xzdata = [];
    for (let i = 0; i < 100; i++) {
      xzdata.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }

    const xgdata = [];
    for (let i = 0; i < 100; i++) {
      xgdata.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }

    let zjxzTable, zjxgTable
    if (this.props.stat.zjxz && this.props.stat.zjxg) {
      if (this.props.stat.zjxz.length > 0) {
        zjxzTable = (
          <Table
           columns={this.props.stat.zjxz}
           dataSource={xzdata}
           size="small"
           scroll={{ x: 1800 }}
           pagination={{pageSize: 5}}
          />
        )
      } else {
        zjxzTable = (<div>暂无数据</div>)
      }

      if (this.props.stat.zjxg.length > 0) {
        zjxgTable = (
          <Table
           columns={this.props.stat.zjxg}
           dataSource={xzdata}
           size="small"
           scroll={{ x: 1800 }}
           pagination={{pageSize: 5}}
          />
        )
      } else {
        zjxgTable = (<div>暂无数据</div>)
      }
    } else {
      zjxzTable = (<div>Loading</div>)
      zjxgTable = (<div>Loading</div>)
    }

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
          <Card title="最近一周新增">
            {zjxzTable}
          </Card>
          <Card title="最近一周修改">
            {zjxgTable}
          </Card>
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
  queryForAdd: PropTypes.func.isRequired,
  queryForUpdate: PropTypes.func.isRequired,
  stat: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    stat: state.stat
  }
}

export default connect(mapStateToProps, STATAction)(Statistics)