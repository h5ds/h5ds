import './phone.less';
import './style.less';

import { Input } from 'antd';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import lodash from 'lodash';

// import { transaction } from 'mobx'; //

const { TextArea } = Input;
/**
 * @desc 图片
 */
@inject(['app'])
@observer
export default class TestEditor extends Component {
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
    renderLayer = lodash.debounce(() => {
        console.log('更新视图');
        this.props.layer.data = this.state.data;
        $(document).trigger('h5ds.setHistory');
    }, 1000);

    componentDidMount() {
        // 渲染center 区域
        $(document).on(
            'h5ds.centerRenderEnd',
            lodash.debounce(() => {
                console.log('0000000000 重新渲染phone页面');
            }, 1000)
        );
    }

    componentWillUnmount() {
        $(document).off('h5ds.centerRenderEnd');
    }

    render() {
        const { data } = this.state;
        return (
            <div className="ex-set-test">
                <TextArea onChange={this.changeTextArea} placeholder="请填写HTML代码" rows={8} value={data} />
            </div>
        );
    }
}
