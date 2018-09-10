import React from 'react';

// 设置 dom
export function layerdom(layer, zIndex) {
    return <div data-qrocde={layer.data} className="qrcode-inner" />;
}