import React from 'react';

// 设置 dom
export function layerdom(layer, zIndex) {
    return <div className="dom-inner" dangerouslySetInnerHTML={{ __html: layer.data }} />;
}