import React, {
	PropTypes
} from 'react'
import {
	Form,
	Select,

} from 'antd'

const Option = Select.Option;
const noneList = ['无', '无症状', '未发现']

/*多选控件 选择 noneList 的其中一个选项就不能选其他的选项*/
export default class MultiSelect extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			disabled: {
				noneDis: false,
				otherDis: false,
			},
			value: this.props.value || []
		}

		this.antd = this.props.antd || {}
		Object.assign(this.antd, {
			tags: true,
			style: {
				width: 200,
				...this.antd.style,
			}
		})

		console.log('MultiSelect--', this.antd, this.props)
	}


	componentWillMount = () => {}

	componentDidMount = () => {
		console.log('MultiSelect.componentDidMount', this.props)
		this.updateState(this.props)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("MultiSelect.componentDidUpdate", this.props, prevProps, prevState, this.state)
	}

	componentWillReceiveProps = (nextProps) => {
		// Should be a controlled component.
		console.log('MultiSelect componentWillReceiveProps', nextProps)
		if ('value' in nextProps) {
			const value = nextProps.value;
			this.updateState(nextProps)
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		return 'value' in nextProps && !!nextProps.value
	}

	updateState = (props) => {
		let value = props.value
		let valueLength, valueFirst, valueLast
		if (!!value && value.constructor == Array) {
			valueLength = value.length
			valueFirst = value[0]
			valueLast = value.slice().pop()

			//2016年12月23日11:33:46 不禁用选项
			/*if (noneList.indexOf(valueFirst) > -1) {
				if (valueLength == 1) {
					this.setState({
						disabled: {
							noneDis: false,
							otherDis: true,
						}
					})
				} else return
			}
			this.setState({
				value
			});*/

			//2016年12月23日11:33:46 智能删除
			if (noneList.indexOf(valueLast) > -1) {
				this.setState({
					value: [valueLast]
				})
			} else {
				let valueArr = []
				value.forEach((optionItem, index) => {
					if (noneList.indexOf(optionItem) == -1) {
						valueArr.push(optionItem)
					}
				})

				this.setState({
					value: valueArr
				})
			}
		}
	}

	handleChange = (value) => {

		//2016年12月23日11:33:46 不禁用选项
		/*let noneDis, otherDis
		if (value.length == 0) {
			noneDis = false
			otherDis = false
		} else {
			if (noneList.indexOf(value[0]) > -1) {
				noneDis = false
				otherDis = true
			} else {
				noneDis = true
				otherDis = false
			}
		}

		this.setState({
			disabled: {
				noneDis,
				otherDis,
			}
		})*/

		console.log(`MultiSelect selected ${value}`, this.props)
		typeof this.antd.onChange == 'function' ? this.antd.onChange(value) : null

		if (!('value' in this.props)) {
			this.setState({
				value
			});
		}
		this.triggerChange(value);
	}

	triggerChange = (changedValue) => {
		// Should provide an event to pass value to Form.
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(changedValue);
		}
	}

	render() {

		const {
			noneDis,
			otherDis,
		} = this.state.disabled

		return (
			<Select
				{...this.antd}
				onChange={this.handleChange}
				value={this.state.value}
			>
				{this.props.options.map((item, i) => {

					let {
						value
					} = item
					let disabled = noneList.indexOf(value) > -1 ? noneDis : otherDis
					return (
						<Option
							key={value}
							disabled={disabled}
						>
							{value}
						</Option>
					)
				})}
			</Select>
		)
	}
}

MultiSelect.propTypes = {
	options: PropTypes.array.isRequired,
	antd: PropTypes.object,
}