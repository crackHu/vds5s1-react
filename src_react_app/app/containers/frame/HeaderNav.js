import React from 'react'
import {
	Menu,
	Icon
} from 'antd';
import {
	Link
} from 'react-router';

import {
	menu_config
} from 'utils'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class HeaderNav extends React.Component {

	constructor() {
		super()

	}

	render() {

		const selectedKeys = [this.props.route.headerNavKey];
		const menuItems = menu_config.headerNav.map((menu, index) => {
			return (
				<Menu.Item key={menu.key}>
	           				<Link to={menu.path}>
	           					<Icon type={menu.iconType} />
	           					{menu.name}
	           				</Link>
	           			</Menu.Item>
			)
		})

		return (
			<Menu selectedKeys = {selectedKeys}
		        mode="horizontal"
		        theme = "blue"
		        className="c-ant-menu"
		      >
		      {menuItems}
		    </Menu>
		)
	}
}