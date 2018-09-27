import React from 'react';

// 设置 dom
export function layerdom(layer, zIndex) {
    const { width, height } = layer.style;
    return (
        <div className="test-inner">
            <canvas id={'CAV_' + layer.eid} width={width} height={height} />
        </div>
    );
}
