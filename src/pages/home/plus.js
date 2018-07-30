import React, { Component } from 'react'; // ... ...
import { inject, observer } from 'mobx-react';

@inject(['app'])
@observer
class TestEditor extends Component {
    layer = this.props.app.getLayer();

    onChange = e => {
        this.layer.data = e.target.value;
    };

    render() {
        const { data } = this.layer;
        return (
            <div>
                <textarea style={{ width: 320 }} rows={6} value={data} onChange={this.onChange} />
            </div>
        );
    }
}

/**
 * @desc 插件配置
 */
export const plus = [
    {
        type: 'test',
        icon: <i className="h5ds ico5-beijing" />,
        name: '测试',
        editor: TestEditor, // 编辑区域
        layerdom: layer => {
            return <div className="test-inner" dangerouslySetInnerHTML={{ __html: layer.data }} />;
        }, // layer dom 纯react组件
        origindata: {
            id: null,
            type: 'test',
            animate: [],
            data: '<div>TEST</div>',
            estyle: {},
            style: {
                width: 200,
                height: 100,
                top: 0,
                left: 0
            },
            color: '',
            ue: {}
        } // 原始数据
    }
];
