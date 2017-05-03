import React, {
    PropTypes,
} from "react"
import {
    Card,
    Modal,
    Input,
    Radio,
    Icon,
    Button,
    Popconfirm,
    Form,
} from 'antd';

const FormItem = Form.Item;

export default class DDModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }
    }

    handleOk = () => {
        console.log('Clicked OK');
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }


    render() {


        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={this.props.width}
                >
                    <Form vertical>
                      <FormItem label="Title">
                        {getFieldDecorator('title', {
                          rules: [{ required: true, message: 'Please input the title of collection!' }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem label="Description">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
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
              </div>
        );
    }
}