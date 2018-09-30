import './style.less';

import React, { Component } from 'react';

import { Input } from 'antd';
import debounce from 'lodash/debounce';

const { TextArea } = Input;
/**
 * @desc dom
 */
export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.layer.data
        };
    }

    changeTextArea = e => {
        this.setState({ data: e.target.value });
        this.renderLayer();
    };

    // renderLayer
    renderLayer = debounce(() => {
        console.log('更新视图');
        this.props.layer.data = this.state.data;
        $(document).trigger('h5ds.setHistory');
    }, 500);

    render() {
        const { data } = this.state;
        return (
            <div className="ex-set-dom">
                <TextArea onChange={this.changeTextArea} placeholder="请填写视频通用代码" rows={8} value={data} />
            </div>
        );
    }
}
