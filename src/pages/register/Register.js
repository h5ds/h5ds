import { Button, Col, Form, Icon, Input, Row, message } from 'antd';

import { Link } from 'react-router-dom';
import React from 'react';
import { history } from '../../utils';
import { userService } from '../../server/user.service';

class Register extends React.Component {
  state = {
    temp: +new Date()
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        userService.register(values).then(d => {
          if (!d.success) {
            message.error(d.msg);
          } else {
            message.success('注册成功！立即去登录！');
            history.push('/login');
          }
        });
      }
    });
  };

  changeCaptcha = () => {
    this.setState({ temp: +new Date() });
  };

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-box">
        <h1>LOGO</h1>
        <h2>技术改变生活，工具创造未来</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                { required: true, message: 'Please input your email!' }
              ]
            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }]
                })(<Input placeholder="captcha code" />)}
              </Col>
              <Col span={12}>
                <img
                  style={{ height: 30 }}
                  onClick={this.changeCaptcha}
                  src={`/api/v1/captcha?t=${this.state.temp}`}
                  alt=""
                />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            已有帐号? <Link to="/login">立即登录</Link>
            <Button type="primary" htmlType="submit" className="login-form-button">
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);
