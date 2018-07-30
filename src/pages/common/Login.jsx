
import './login.less';
import React, { Component } from 'react';
import { Input, Button } from 'antd';

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <h1>运营后台管理系统</h1>
                <div className="item">
                    <label>账号：</label>
                    <span className="ctx">
                        <Input />
                    </span>
                </div>
                <div className="item">
                    <label>密码：</label>
                    <span className="ctx">
                        <Input type="password" />
                    </span>
                </div>
                <div className="item">
                    <label></label>
                    <span className="ctx alignRight">
                        <a>找回密码</a>
                    </span>
                </div>
                <div className="item">
                    <label></label>
                    <span className="ctx">
                        <Button type="primary" style={{ width: 250 }}>登录</Button>
                    </span>
                </div>
            </div>
        );
    }
}