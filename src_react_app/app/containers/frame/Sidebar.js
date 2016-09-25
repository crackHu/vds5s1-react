import React from 'react'
import {
	Menu,
	Icon
} from 'antd';
import {
	Link
} from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

/*左边侧边栏*/
export default class Sidebar extends React.Component {

	constructor() {
		super()
	}

	render() {
		return (
			<aside>
				<Menu theme="blue-dark" defaultOpenKeys={['sub1']} style={{ width: 224}} selectedKeys={[this.props.route.sidebarKey]} mode="inline">
	        		<SubMenu key="sub1" title={<span><Icon type="book" /><span>首页</span></span>}>
	        			<Menu.Item key="survey"><Link to='/'>应用概况</Link></Menu.Item>
	        		</SubMenu>
	      		</Menu>
	      		<Menu theme="blue-dark" defaultOpenKeys={['sub1']} style={{ width: 224}} selectedKeys={[this.props.route.sidebarKey]} mode="inline">
	        		<SubMenu key="sub1" title={<span><Icon type="book" /><span>档案管理</span></span>}>
	        			<Menu.Item key="create"><Link to='/AntContainer1'>新建档案</Link></Menu.Item>
	        			<Menu.Item key="list"><Link to='/AntContainer2'>个人档案列表</Link></Menu.Item>
	        		</SubMenu>
	      		</Menu>
	      		<Menu theme="blue-dark" defaultOpenKeys={['sub1']} style={{ width: 224}} selectedKeys={[this.props.route.sidebarKey]} mode="inline">
	        		<SubMenu key="sub1" title={<span><Icon type="book" /><span>数据统计</span></span>}>
	        			<Menu.Item key="test"><Link to='/ArchivDetail'>建档明细</Link></Menu.Item>
	        		</SubMenu>
	      		</Menu>
      		</aside>
		)
	}
}