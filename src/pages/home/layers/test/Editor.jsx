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
        this.renderLayer(e.target.value);
    };

    // renderLayer
    renderLayer = debounce(str => {
        console.log('更新视图');
        this.props.layer.data = str;
        $(document).trigger('h5ds.setHistory');
    }, 500);

    componentDidMount() {
        // 渲染center 区域
        $(document).on(
            'h5ds.centerRenderEnd',
            debounce(() => {
                const { eid, style } = this.props.layer;
                console.log('0000000000 重新渲染phone页面', eid, );
                const { width, height } = style;
                const lightAnimate = $('#' + eid + '_phoneview').data('lightAnimate');
                lightAnimate.resize({ width, height });
            }, 500)
        );
    }

    componentWillUnmount() {
        $(document).off('h5ds.centerRenderEnd');
    }

    render() {
        const { data } = this.state;
        return (
            <div className="ex-set-dom">
                <TextArea onChange={this.changeTextArea} placeholder="..." rows={8} value={data} />
                ASDASDASD
            </div>
        );
    }
}
