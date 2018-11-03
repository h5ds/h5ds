import './style.less';
import 'h5ds/css/h5ds.4.2.0.css'; // 编辑器样式
import './layers/plus'; // 手机端会执行的代码

import * as layers from './layers';

import React, { Component } from 'react'; // ...

import H5DS from 'h5ds'; // ..
import { Modal } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';
import pretty from 'pretty';

/**
 * @desc H5DS 接口参数 见文档 http://doc.h5ds.com
 * @param plugins [Component] 插件挂载
 * @param data object 初始数据
 * @param storeback function 实例化store后，返回store对象
 * @param before function 初始化之前
 * @param success function 初始化之后 ...
 * @param fail function 失败时
 */
export default class HomePage extends Component {
    state = {
        visible: false,
        shtml: ''
    };

    // 保存当前页面
    savePage = (appid, cdata) => {
        console.log('保存当前页面', appid, cdata);
        return new Promise((resolve, reject) => {
            // ...
            resolve();
        });
    };

    // 保存 app
    saveApp = (appid, cdata) => {
        console.log('保存APP', appid, cdata);
        return new Promise((resolve, reject) => {
            // ...
            resolve();
        });
    };

    // 发布
    publishApp = (appid, cdata, shtml) => {
        // console.log('发布应用', appid, cdata, shtml);
        return new Promise((resolve, reject) => {
            this.setState({ visible: true, shtml: pretty(shtml) });
            resolve();
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, shtml } = this.state;
        return (
            <div>
                <H5DS
                    appid="h5ds_demoid"
                    config={{ appHost: '', appCDN: 'http://cdn.h5ds.com/lib', backUrl: '/' }}
                    uploadSet={{}}
                    savePage={this.savePage}
                    saveApp={this.saveApp}
                    publishApp={this.publishApp}
                    plugins={[...Object.values(layers)]}
                />
                <Modal
                    width={1200}
                    title="生成代码"
                    visible={visible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                >
                    <div className="codes-detail">
                        {/* <pre>{shtml}</pre> */}
                        <SyntaxHighlighter language="htmlbars" style={github}>
                            {shtml}
                        </SyntaxHighlighter>
                    </div>
                </Modal>
            </div>
        );
    }
}
