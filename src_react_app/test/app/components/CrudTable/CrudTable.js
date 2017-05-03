import React from 'react'
import { Table, Tag } from 'antd'
import { Link } from 'react-router'

export class CrudTable extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,

    size: React.PropTypes.string,
    rowSelection: React.PropTypes.object,

    advancedSearch: React.PropTypes.string,
    advancedSearchConfig: React.PropTypes.object,
    create: React.PropTypes.func,
    delete: React.PropTypes.func,
    update: React.PropTypes.func,
    select: React.PropTypes.func,
  };

  static defaultProps = {
    data: {
      content: [],
      totalElements: 0,
      number: 0,
      size: 0,
      sort: undefined
    },
    config: {
      columns: []
    },
    size: 'default'
  };

  constructor(props) {
    console.debug('CrudTable.constructor', props)
    super(props);
  };

  state = (() => {
    const data = this.props.data
    return {
      dataSource: data.content,
      total: data.totalElements,
      current: data.number,
      pageSize: data.size,
      sort: data.sort,

      condition: {},
      loading: true,
      expandedRowKeys: []
    }
  })()

  componentDidMount = () => {
    console.debug('CrudTable.componentDidMount', this.props, this.state)
    this.props.select()
  }

  componentWillReceiveProps = (nextProps) => {
    console.debug('CrudTable.componentWillReceiveProps', nextProps, this.props)
    this.refreshState(nextProps)
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.debug('CrudTable.componentWillUpdate', nextProps, nextState)
  }

  refreshState = (props) => {
    const { data, params } = props
    // const loading = params.category === this.props.params.category ? false : true
    this.setState({
      dataSource: data.content,
      total: data.totalElements,
      current: data.number + 1,
      pageSize: data.size,
      sort: data.sort,
      loading: false,
    })
  }

  loading = (loading = true) => {
    this.setState({
      loading
    })
  }

  handleSearch = (values) => {
    console.log('Table Received values of form: ', values, this.state);
   
    const { name, status } = values
    const { current, pageSize, sort } = this.state
    let code = undefined
    if (status) {
      code = status === '未完成' ? 0 : 1
    }
    this.loading()
    const condition = {name, status: code}
    this.setState({
      condition
    }, () => {
      this.props.getDataSource('employee', condition, { current, pageSize, sort })
    })
  }

  resetFields = () => {
    this.setState({
      condition: {}
    })
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter, this.state, this.props);
    const { current, pageSize } = pagination
    const { field, order} = sorter
    let sort
    if (field && order) {
      sort = `${field} ${order === 'descend' ? 'desc' : 'asc'}`
    }
    this.setState({
      loading: true,
      sort,
    }, () => {
      this.props.select(undefined, { current, pageSize, sort })
    });
  }

  handleRowClick = (record, index) => {
    const { expandedRowKeys } = this.state
    this.setState({ expandedRowKeys: expandedRowKeys && expandedRowKeys[0] === record.id ? [] : [record.id] })
  }

  genIcon = (type) => {
    const html = `<use xlink:href="#icon-${type}" />`
    return <svg className="icon" dangerouslySetInnerHTML={{__html: html }} />
  }

  convertColumn = (columns) => {
    return columns.map(column => {
      if (column.hasOwnProperty('render')) {
          let { title, dataIndex, key, render } = column
          if (render && render.constructor === Object) {
              if ('format' in render) {
                  let format = render.format
                  column['render'] = text => {
                      return new Date(parseInt(text)).format(format)
                  }
              }
              if ('link' in render && 'onClick' in render) {
                  let { link } = render
                  if (render['link'] && render['onClick']) {
                      column['render'] = (text, record) => {
                          const index = link.indexOf(':')
                          const property = record[link.substring(index + 1)]
                          const path = `${link.substring(0, index)}${property}`
                          return <Link to={path}>{text}</Link>
                      }
                  } else {
                      delete column['render']
                  }
              }
              if ('condition' in render && 'switch' in render) {
                let { condition, tag } = render
                let isTag = 'tag' in render && render['tag'].constructor == Object

                if (render['switch']) {
                  column['render'] = (text, record) => {
                    let result = record[dataIndex]
                    return isTag ? <Tag color={tag[result]}>{condition[result]}</Tag> : condition[result]
                  }
                } else {
                  delete column['render']
                }
              }
          }
      }
      if (column.hasOwnProperty('custom')) {
          if (column['custom']) {
            let { joinColumn, groupIcon } = column
            if (groupIcon && groupIcon.constructor == Object) {
              column['render'] = (text, record) => {
                const iconGroup = Object.keys(groupIcon).map(icon => {
                  const result = record[icon] || 'default'
                  const  type = groupIcon[icon][result]
                  return this.genIcon(type)
                })
                return iconGroup
              }
              delete column['custom']
              delete column['groupIcon']
            }
            if (joinColumn && joinColumn.constructor == Array) {
              column['render'] = (text, record) => {
                let c = joinColumn.map(join => {
                  return record[join]
                })
                const result = c.join('/')
                return result === '////' ? '无' : result
              }
              delete column['joinColumn']
            }
          }
      }
      return column
    })
  }

  render() {

    const {
      dataSource,
      total,
      current,
      pageSize,
      sort,

      loading,
      expandedRowKeys
    } = this.state

    const { 
      config,
      advancedSearch,
      advancedSearchConfig,
    } = this.props

    let {
      columns
    } = config

    columns = this.convertColumn(columns)

    const pagination = {
      current,
      total,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log('onShowSizeChange ', 'Current: ', current, '; PageSize: ', pageSize);
      },
      onChange: (current) => {
        console.log('onChange', current)
      },
      showQuickJumper: true,
      pageSize,
      showTotal: (total, range) => `共 ${total} 条 （${range[0]}-${range[1]}）`
    }

    const AdvancedSearchForm = advancedSearch ? require(`../${advancedSearch}/index`).default : null

    return (
      <div>
        {AdvancedSearchForm ? 
          <AdvancedSearchForm
           config={advancedSearchConfig}
           handleSearch={this.handleSearch}
           resetFields={this.resetFields}
          />
         : null}
        <Table
            size={this.props.size}
            rowSelection={this.props.rowSelection}

            rowKey={record => record.id}
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            loading={loading}
            onChange={this.handleChange}
            expandedRowKeys={expandedRowKeys}
            onRowClick={this.handleRowClick}
        />
      </div>
    )
  }
}

export default CrudTable