import './login.less'; // ...

import { Button, Checkbox, Form, Icon, Input } from 'antd';
import { inject, observer } from 'mobx-react';

import { Link } from 'react-router-dom';
import React from 'react';
import { history } from '../../utils';
import { userService } from '../../server/user.service';

@inject('user')
@observer
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        userService.login({ email, password }).then(data => {
          userService.setToken(data.token);
          this.props.user.setUserInfo(data).then(() => {
            history.push('/user');
          });
        });
      }
    });
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
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                { required: true, message: 'Please input your username!' }
              ]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码?
            </a>{' '}
            Or <Link to="/register">立即注册</Link>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
