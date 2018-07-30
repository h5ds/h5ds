
import './limit.less';
import React, { Component } from 'react';

export default class Limit extends Component {
    // 构造函数
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        size: 10 // 默认10 个字
    }

    //
    render() {
        const { className, children, size, ...other } = this.props;

        if(children === null){
            return null;
        }

        let cName = ['mt-limit'];
        if (className) {
            cName.push(className);
        }
        let text = '';
        if(children.length > size) {
            text = children.slice(0, size) + '...';
        }else {
            text = children;
        }

        return (
            <div title={children} {...other} className={cName.join(' ')}>
                {text}
            </div>
        );
    }
}