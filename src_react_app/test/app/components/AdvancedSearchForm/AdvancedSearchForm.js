import React from 'react'
import { Spin, Form, Row, Col, Input, Button, Icon, Select, Radio, Cascader, DatePicker } from 'antd';
import './AdvancedSearchForm.scss'

const FormItem = Form.Item
const Option = Select.Option

export class AdvancedSearchForm extends React.Component {
  static propTypes = {
    config: React.PropTypes.object.isRequired,
    handleSearch: React.PropTypes.func.isRequired,
    resetFields: React.PropTypes.func.isRequired
  }

  static defaultProps = {};

  state = {
    expand: false
  };

  componentDidUpdate = () => {
    console.log('AdvancedSearchForm.componentDidUpdate')
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      this.props.handleSearch(values)
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.resetFields()
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  genSelectOptions = (data) => {
    return data.map((item, i) => {
        return <Option key={item.value}>{item.value}</Option>
    })
  }

  genForm = (formConfig = this.props.config) => {
    const { getFieldDecorator } = this.props.form;
    const { formItemLayout, item } = formConfig
    const children = []
    item.map((item, i) => {
      const {
        required,
        message,
        type,
        config,
        hidden,
        options,
        optionSessionStorageProperty,
        name,
        label
      } = item
      if (hidden === true) return

      /*rules option*/
      let option
      if (required) {
          option = { rules: [{ required, message }] }
      }
      let component
      switch (type) {
        case 'input':
          component = <Input {...config} />
          break
        case 'select':
          const sSoptions = sessionStorage[optionSessionStorageProperty]
          try {
            // options = options ? options : JSON.parse(sSoptions || '[]')
            component = (
                <Select {...config}>
                    {options ? this.genSelectOptions(options) : null}
                </Select>
            )
          } catch (e) {
            console.error(e, `${name}[${label}] 组件初始化失败`, optionSessionStorageProperty)
          }
          break
        case 'datepicker':
          let { format } = item
          component = <DatePicker {...config} format={format}/>
          break
        case 'cascader':
          component = <Cascader {...config} options={options}/>
          break
        default:
          component = <Input {...config} />
          break
      }
      if (!component) return

      children.push(
        <Col span={8} key={i}>
          <FormItem {...formItemLayout} key={i} label={label}>
            {getFieldDecorator(name, option)(
              component
            )}
          </FormItem>
        </Col>
      )
    })
    return children
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // To generate mock Form.Item
    // const children = [];
    // for (let i = 0; i < 10; i++) {
    //   children.push(
    //     <Col span={8} key={i}>
    //       <FormItem {...formItemLayout} label={`Field ${i}`}>
    //         {getFieldDecorator(`field-${i}`)(
    //           <Input placeholder="placeholder" />
    //         )}
    //       </FormItem>
    //     </Col>
    //   );
    // }
    const children = this.genForm()

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 3;
    
    return children.length !== 0 ? (
      <div id="components-form-demo-advanced-search">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={40}>
            {children.slice(0, shownCount)}
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                清空
              </Button>
              {children.length > 3 ? (
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  Collapse <Icon type={expand ? 'up' : 'down'} />
                </a>
              ): null}
            </Col>
          </Row>
        </Form>
      </div>
    ) : null
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm