import React, {
    PropTypes,
} from "react"
import {
    Table,
    Button,
    Input,
    Popconfirm,
    Select,
    DatePicker,
    InputNumber,
    Cascader,
} from 'antd';
import {
    getMomentObj,
    getMomentFormat,
} from 'utils'

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: this.props.editable || false,
        type: this.props.type || 'input',
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({
                editable: nextProps.editable
            });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({
                    value: this.cacheValue
                });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    handleChange(e) {
        const value = e.target ? e.target.value : e;
        this.setState({
            value
        }, () => console.debug('this.state', value, this.state));
    }
    renderControlsByType(type, value) {

        let config, options, format
        let component
        switch (type) {
            case 'input':
                component = <Input {...config} value={value} onChange={e => this.handleChange(e)} />
                break
            case 'inputnumber':
                component = <InputNumber {...config} value={value} onChange={e => this.handleChange(e)} />
                break
            case 'select':
                component = (
                    <Select {...config} value={value} onChange={e => this.handleChange(e)}>
                        {options ? getSelectOptions(options) : null}
                    </Select>
                )
                break
            case 'datepicker':
                component = <DatePicker {...config} showTime format={format} value={getMomentObj(value)} onChange={e => this.handleChange(e)} />
                break
            case 'cascader':
                component = <Cascader {...config} options={options} value={['asd','asdffff']} onChange={e => this.handleChange(e)} />
                break
            default:
                component = <Input {...config} value={value} onChange={e => this.handleChange(e)} />
                break
        }
        return component
    }
    render() {
        const {
            value,
            editable,
            type,
        } = this.state;
        return (
            <div>
              {
                editable ?
                    <div>{this.renderControlsByType(type, value)}</div>
                :
                <div className="editable-row-text">
                  {value || ' '}
                </div>
              }
            </div>
        );
    }
}

export default class EditableRowTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '测量时间',
            dataIndex: 'name',
            width: '20%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
        }, {
            title: '收缩压(mmhg)',
            dataIndex: 'age',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text),
        }, {
            title: '舒张压(mmhg)',
            dataIndex: 'address',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
        }, {
            title: '心率(次/分钟)',
            dataIndex: 'address1',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'address1', text),
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const {
                    editable
                } = this.state.data[index].name;
                return (
                    <div className="editable-row-operations">
                      {
                        editable ?
                        <span>
                          <a onClick={() => this.editDone(index, 'save')}>确认</a>
                          <Popconfirm title="确认不做更改？" onConfirm={() => this.editDone(index, 'cancel')}>
                            <a>取消</a>
                          </Popconfirm>
                        </span>
                        :
                        <span>
                          <a onClick={() => this.edit(index)}>编辑</a>
                          <a onClick={() => this.delete(index)}>删除</a>
                        </span>
                      }
                    </div>
                );
            },
        }];
        this.state = {
            data: [{
                key: '0',
                name: {
                    type: 'datepicker',
                    editable: false,
                    value: '2017-01-09 14:34:31',
                },
                age: {
                    type: 'select',
                    editable: false,
                    value: '110',
                },
                address: {
                    type: 'inputnumber',
                    editable: false,
                    value: '120',
                },
                address1: {
                    type: 'cascader',
                    editable: false,
                    value: '114',
                },
            }],
        };
    }
    renderColumns(data, index, key, text) {
        const {
            editable,
            type,
            status
        } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (
            <EditableCell
              editable={editable}
              type={type}
              value={text}
              onChange={value => this.handleChange(key, index, value)}
              status={status}
            />
        );
    }
    handleChange(key, index, value) {
        const {
            data
        } = this.state;
        data[index][key].value = value;
        this.setState({
            data
        });
    }
    handleAdd() {
        const {
            data
        } = this.state;
        const newData = {
            key: '1',
            name: {
                type: 'datepicker',
                editable: false,
                value: '2017-01-09 14:34:31',
            },
            age: {
                type: 'select',
                editable: false,
                value: '110',
            },
            address: {
                type: 'inputnumber',
                editable: false,
                value: '120',
            },
            address1: {
                type: 'cascader',
                editable: false,
                value: '114',
            },
        };
        console.log('add', [...data, newData])
        this.setState({
            data: [...data, newData],
        });

    }
    edit(index) {
        const {
            data
        } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({
            data
        });
    }
    editDone(index, type) {
        const {
            data
        } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({
            data
        }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }
    delete(index) {
        const {
            data
        } = this.state;

        this.setState({
            data
        });
    }
    render() {
        const {
            data
        } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return (
            <div>
                <Button className="editable-add-btn" icon="plus" type="primary" onClick={() => this.handleAdd()}>新 增</Button>
                <Table bordered dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}