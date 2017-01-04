import React, {
    PropTypes,
} from "react"
import {
    Card,
    Table,
    Input,
    Icon,
    Button,
    Popconfirm,
    Modal,
    Form,
    Radio,
    InputNumber,
    Cascader,
    DatePicker,
} from 'antd';

import DDModal from 'app_base/components/DDModal'

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
        const {
            visible,
            onCancel,
            onCreate,
            form,
        } = props;
        const {
            getFieldDecorator
        } = form;
        const status = 'Create'
        const options = [{
            value: 'Zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'Hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'Xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'Jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'Nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];
        return (
            <Modal
                visible={visible}
                title={`${status} a new collection`}
                okText={status}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form vertical>
                  <FormItem label="Name">
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please input the NAME of collection!' }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem label="Birthdate">
                    {getFieldDecorator('birthdate')(
                      <DatePicker />
                    )}
                  </FormItem>
                  <FormItem label="Address">
                    {getFieldDecorator('address')(
                        <Cascader options={options} placeholder="Please select" />
                    )}
                  </FormItem>
                  <FormItem label="Remark">
                    {getFieldDecorator('remark')(
                        <Input type="statusarea" />
                    )}
                  </FormItem>
                  <FormItem className="collection-create-form_last-form-item">
                    {getFieldDecorator('modifier', {
                      initialValue: 'public',
                    })(
                      <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Form>
            </Modal>
        );
    }
);

export default class CollectionsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            visible: false,
            status: "Create",
            dataSource: [{
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            }, {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            }, {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            }]
        }
    }

    handleAdd = () => {
        this.handleModalVisible(true)
    }

    handleModalVisible = (visible = true) => {
        this.setState({
            modalVisible: visible
        })
    }


    showModal = (status = 'Create') => {
        this.setState({
            visible: true,
            status,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({
                visible: false,
                dataSource: this.state.dataSource.concat({
                    key: Date.now(),
                    name: values.name,
                    age: 2016 - values.birthdate.weekYear(),
                    address: values.address.join(' '),
                })
            });
        });
    }

    handleUpdate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({
                visible: false,
                dataSource: this.state.dataSource.concat({
                    key: Date.now(),
                    name: values.name,
                    age: 2016 - values.birthdate.weekYear(),
                    address: values.address.join(' '),
                })
            });
        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    delete = () => {
        let len = this.state.dataSource.length
        let data = this.state.dataSource.slice()
        data.splice(len - 1, 1)

        this.setState({
            dataSource: data
        });
    }

    render() {

        const dataSource = this.state.dataSource
        const columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '25%',
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => (
                <span>
                  <a href="#">Action 一 {record.name}</a>
                  <span className="ant-divider" />
                  <a href="#" onClick={this.delete}>Delete</a>
                  <span className="ant-divider" />
                  <a href="#" className="ant-dropdown-link">
                    More actions <Icon type="down" />
                  </a>
                </span>
            ),
        }];
        console.log('asdfasd1111', this.state, typeof this.state.status)
        return (
            <Card>
                <Button
                    className="editable-add-btn"
                    type="ghost"
                    onClick={this.showModal}
                >
                    New Collection
                </Button>

                {/*<DDModal
                    title={'Create a new collection'}
                    width={'50%'}
                    visible={this.state.modalVisible}
                />*/}

                <CollectionCreateForm
                  ref={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                  onUpdate={this.handleUpdate}
                  status={this.state.status}
                />
                
                <Table
                    bordered
                    dataSource={dataSource}
                    //onRowClick={() => this.showModal('Update')}
                    columns={columns}
                />
            </Card>
        );
    }
}