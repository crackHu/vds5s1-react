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
                component = <DatePicker {...config} format={format} value={getMomentObj(value)} onChange={e => this.handleChange(e)} />
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

        this.FUNC = this.props.function
        this.HAS_FUNC_CREATE = this.FUNC.indexOf('CREATE') > -1
        this.HAS_FUNC_DELETE = this.FUNC.indexOf('DELETE') > -1
        this.HAS_FUNC_UPDATE = this.FUNC.indexOf('UPDATE') > -1
        this.HAS_FUNC_SELECT = this.FUNC.indexOf('SELECT') > -1

        this.state = {
            data: [],
            pageSize: this.props.defalutPageSize,
            current: this.props.defalutPageNo,
            total: 0,
        };
        this.columns = this.props.columns.slice();
        this.columns.map(column => {
            column['render'] = (text, record, index) => this.renderColumns(this.state.data, index, column['dataIndex'], text)
        })
        if (this.HAS_FUNC_UPDATE || this.HAS_FUNC_DELETE) {
            this.columns.push({
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    const {
                        editable
                    } = this.state.data[index].name;
                    return (
                        <div className="editable-row-operations">
                          {
                            editable && this.HAS_FUNC_UPDATE ?
                            <span>
                              <a onClick={() => this.editDone(index, 'save')}>确认</a>
                              <Popconfirm title="确认不做更改？" onConfirm={() => this.editDone(index, 'cancel')}>
                                <a>取消</a>
                              </Popconfirm>
                            </span>
                            :
                            <span>
                              {this.HAS_FUNC_UPDATE ? <a onClick={() => this.edit(index)}>编辑</a> : null}
                              {this.HAS_FUNC_DELETE ? <a onClick={() => this.delete(index)}>删除</a> : null}
                            </span>
                          }
                        </div>
                    );
                },
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {

        /*[{
            key: '0',
            xy_sfrq2: {
                type: 'datepicker',
                editable: false,
                value: '2017-01-09 14:34:31',
            },
            xy_tz_xy2: {
                type: 'inputnumber',
                editable: false,
                value: '110',
            },
            xy_tz_xy1: {
                type: 'inputnumber',
                editable: false,
                value: '120',
            },
            xy_tz_xl: {
                type: 'inputnumber',
                editable: false,
                value: '114',
            },
        }]*/
        const {
            dataSource,
            total
        } = nextProps
        let data = dataSource.map((data, index) => {
            let obj = {}
            Object.keys(data).map(key => {
                obj[key] = {}
                obj[key]['value'] = data[key]
            })
            return {
                key: index,
                ...obj
            }
        })
        this.setState({
            data,
            total
        })
        console.log('asdfaccc11', dataSource, total, this.state.data, this.state.total)
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
        const key = data[data.length - 1]['key']
        const newData = {
            key: key + 1,
            name: {
                type: 'datepicker',
                editable: true,
                value: '2017-01-09 14:34:31',
            },
            age: {
                type: 'select',
                editable: true,
                value: '110',
            },
            address: {
                type: 'inputnumber',
                editable: true,
                value: '120',
            },
            address1: {
                type: 'cascader',
                editable: true,
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
            data,
            current,
            pageSize,
            total,
        } = this.state;
        const {
            pagination,
        } = this.props

        const dataSource = this.HAS_FUNC_SELECT ? data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        }) : null
        const columns = this.columns;
        const pagination_ = pagination ? {
            current,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: (current, pageSize) => {
                this.setState({
                    current,
                    pageSize
                }, () => {
                    this.props.getDataSource(pageSize, current)
                })
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: (current) => {
                console.log('onChange', this.state)
                this.setState({
                    current,
                }, () => {
                    this.props.getDataSource(pageSize, current)
                    console.log('Current: ', current, this.state);
                })
            },
            showTotal: (total, range) => `共 ${total} 条 （${range[0]}-${range[1]}）`
        } : false

        return (
            <div>
                {
                    this.HAS_FUNC_CREATE ?
                    <Button className="editable-add-btn" icon="plus" type="primary" onClick={() => this.handleAdd()}>新 增</Button>
                    : null
                }
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination_}
                />
            </div>
        );
    }
}

EditableRowTable.propTypes = {
    /*分页*/
    pagination: PropTypes.bool,
    defalutPageSize: PropTypes.number,
    defalutPageNo: PropTypes.number,
    total: PropTypes.number,
    getDataSource: PropTypes.func,
    /*CREATE, DELETE, UPDATE, SELECT, QUERY*/
    function: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
}