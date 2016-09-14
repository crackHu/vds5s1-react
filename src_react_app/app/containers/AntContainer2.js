import React from 'react';
import {
	Table,
	Icon,
	Pagination,
	Button,
	Row,
	Col,
	Modal

} from 'antd';
import QueueAnim from 'rc-queue-anim';

import AdvancedSearch from './AdvancedSearch'

export default class AntContainer2 extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			modalVisible: false
		}

		/*modal event*/
		this.showModal = (e) => {
			this.setState({
				modalVisible: true,
			});
		}

		this.switchModalVisible = (param) => {
			this.setState({
				modalVisible: param,
			});
		}

		this.sendSearchCondition = (param) => {
			console.log("收到表单值：" + JSON.stringify(param))
		}

		this.test = (obj) => {
			console.log("test:")
			console.log(obj)
		}
	}

	componentDidMount() {
		setTimeout(
			() => {
				this.setState({
					loading: false
				})
			}, 300)

	}
	render() {
		const ButtonGroup = Button.Group;
		const columns = [{
			title: '个人编号',
			dataIndex: 'grbh',
			key: 'grbh',
		}, {
			title: '姓名',
			dataIndex: 'grda_xm',
			key: 'grda_xm',
			render: (text) => <a href="#">{text}</a>,
		}, {
			title: '性别',
			dataIndex: 'grda_xb',
			key: 'grda_xb',
		}, {
			title: '出生日期',
			dataIndex: 'grda_csrq',
			key: 'grda_csrq',
		}, {
			title: '身份证号码',
			dataIndex: 'grda_sfzhm',
			key: 'grda_sfzhm',
		}, {
			title: '户口地址_街道(镇)名称',
			dataIndex: 'grda_hkdz_jdzmc',
			key: 'grda_hkdz_jdzmc',
		}, {
			title: '户口地址_居委(村)名称',
			dataIndex: 'grda_hkdz_jwcmc',
			key: 'grda_hkdz_jwcmc',
		}, {
			title: '户口地址_路_街_名称',
			dataIndex: 'grda_hkdz_ljmc',
			key: 'grda_hkdz_ljmc',
		}, {
			title: '户口类型',
			dataIndex: 'grda_hklx',
			key: 'grda_hklx',
		}, {
			title: '本人电话',
			dataIndex: 'grda_brdh',
			key: 'grda_brdh',
		}, {
			title: '家庭电话',
			dataIndex: 'grda_jtdh',
			key: 'grda_jtdh',
		}, {
			title: '操作',
			key: 'operation',
			render: (text, record) => (
				<span>
			      <a href="#">操作一{record.name}</a>
			      <span className="ant-divider"></span>
			      <a href="#">操作二</a>
			      <span className="ant-divider"></span>
			      <a href="#" className="ant-dropdown-link">
			        更多 <Icon type="down" />
			      </a>
			    </span>
			),
		}];

		const data = [];
		for (let i = 0; i < 46; i++) {
			data.push({
				/*id: i,
				key: i,
				name: `李大嘴${i}`,
				age: 32,
				address: `西湖区湖底公园${i}号`,*/

				grbh: i,
				grda_xm: i,
				grda_xb: i,
				grda_csrq: i,
				grda_sfzhm: i,
				grda_hkdz_jdzmc: i,
				grda_hkdz_jwcmc: i,
				grda_hkdz_ljmc: i,
				grda_hklx: i,
				grda_brdh: i,
				grda_jtdh: i,
			});
		}

		const pagination = {
			total: data.length,
			showSizeChanger: true,
			onShowSizeChange(current, pageSize) {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange(current) {
				console.log('Current: ', current);
			},
		};

		const advancedSearch = this.state.modalVisible ? [
			<AdvancedSearch key="advancedSearch" modalVisible={this.state.modalVisible} switchModalVisible={this.switchModalVisible} sendSearchCondition={this.sendSearchCondition}
			  fields={this.test} onFieldsChange={this.test}/>
		] : null;

		return (
			<QueueAnim delay={10}>
				<div key="button">
					<ButtonGroup style={{margin: "1em auto"}}>
				      <Button type="ghost" icon="file-text" size="large">新建档案</Button>
				      <Button type="ghost" icon="edit" size="large"	>修改档案</Button>
				      <Button type="ghost" icon="download" size="large">导入</Button>
				      <Button type="ghost" icon="search" size="large" onClick={this.showModal}>档案查询</Button>
				      {advancedSearch}
				    </ButtonGroup>
			    </div>
				<Table key="table" columns={columns} dataSource={data} pagination={pagination} loading={this.state.loading} bordered/>
			</QueueAnim>
		)
	}
}