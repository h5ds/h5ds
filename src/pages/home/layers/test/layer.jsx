import React from 'react';

// 设置 dom
export function testHTML(layer, zIndex) {
    return <div className="test-inner" dangerouslySetInnerHTML={{ __html: layer.data }} />;
}

// 原始数据
export const test = {
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
};
