import React, { Component } from 'react';

import { bindSelf } from '../utils';

/**
 * @desc 图片裁剪框
 */
export default class CropControl extends Component {
  constructor(props) {
    super(props);
    this.set = {
      // 选择框的样式
      dashFill: '#f04e00',
      fill: '#f04e00',
      bgFill: 'rgba(0,0,0, 0.2)',
      dotSize: 10
    };
    const { boxWidth, boxHeight, width, height, top = 0, left = 0 } = props;
    this.state = {
      width: width || boxWidth,
      height: height || boxHeight,
      top,
      left,
      boxWidth,
      boxHeight
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { width, height, top, left, boxWidth, boxHeight } = nextProps;
    this.setState({ width, height, top, left, boxWidth, boxHeight });
  }

  /**
   * 变化的时候，会不停触发该函数
   */
  @bindSelf
  cropTick() {
    this.props.onCropTick && this.props.onCropTick({ ...this.state });
  }

  /**
   * 裁剪结束触发的回调
   */
  @bindSelf
  cropEnd() {
    this.props.onCropEnd && this.props.onCropEnd({ ...this.state });
  }

  /**
   * 移动选框
   */
  @bindSelf
  mousedownDrag(e) {
    const down = {
      left: e.pageX - this.state.left,
      top: e.pageY - this.state.top
    };
    const { width, height, boxHeight, boxWidth } = this.state;
    $(document)
      .on('mousemove.h5ds.cropControl.drag', em => {
        let left = em.pageX - down.left;
        let top = em.pageY - down.top;
        // 设置边界
        if (top + height > boxHeight) {
          top = boxHeight - height;
        } else if (top < 0) {
          top = 0;
        }
        if (left + width > boxWidth) {
          left = boxWidth - width;
        } else if (left < 0) {
          left = 0;
        }
        this.setState({ top, left }, this.cropTick);
      })
      .on('mouseup.h5ds.cropControl.drag', () => {
        $(document).off('mousemove.h5ds.cropControl.drag');
        $(document).off('mouseup.h5ds.cropControl.drag');
        // 更新render
        this.cropEnd();
      });
  }

  /**
   * 缩放操作
   */
  @bindSelf
  mousedownZoom(e, type) {
    const down = {
      x: e.pageX,
      y: e.pageY
    };
    const { left, top, width, height, boxHeight, boxWidth } = this.state;
    let _width = width,
      _height = height,
      _top = top,
      _left = left;
    $(document)
      .on('mousemove.h5ds.cropControl.zoom', em => {
        const mouse = {
          x: em.pageX - down.x,
          y: em.pageY - down.y
        };

        if (type == 'topleft') {
          _width = width - mouse.x;
          _height = height - mouse.y;
          _left = left + mouse.x;
          _top = top + height - _height;
        } else if (type == 'topright') {
          _width = width + mouse.x;
          _height = height - mouse.y;
          _top = top + height - _height;
        } else if (type == 'bottomleft') {
          _width = width - mouse.x;
          _height = height + mouse.y;
          _left = left + mouse.x;
        } else if (type == 'bottomright') {
          _width = width + mouse.x;
          _height = height + mouse.y;
        }
        // 设置边界
        if (_height < 0) {
          _height = 0;
        } else if (_height > boxHeight) {
          _height = boxHeight;
        }
        if (_width < 0) {
          _width = 0;
        } else if (_width > boxWidth) {
          _width = boxWidth;
        }
        if (_top < 0) {
          _top = 0;
        }
        if (_left < 0) {
          _left = 0;
        }
        this.setState({ left: _left, top: _top, width: _width, height: _height }, this.cropTick);
      })
      .on('mouseup.h5ds.cropControl.zoom', () => {
        $(document).off('mousemove.h5ds.cropControl.zoom');
        $(document).off('mouseup.h5ds.cropControl.zoom');
        this.cropEnd();
      });
  }

  render() {
    const { top, left, width, height, boxHeight, boxWidth } = this.state;
    const { dashFill, fill, bgFill, dotSize } = this.set;
    const dotsData = [
      { x: 0, y: 0, width: dotSize, height: dotSize, type: 'topleft' },
      { x: width, y: 0, width: dotSize, height: dotSize, type: 'topright' },
      { x: width, y: height, width: dotSize, height: dotSize, type: 'bottomright' },
      { x: 0, y: height, width: dotSize, height: dotSize, type: 'bottomleft' }
    ];
    return (
      <div
        className="h5ds-recrop-control"
        style={{
          width: boxWidth,
          height: boxHeight
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={boxWidth} height={boxHeight}>
          <g
            style={{
              transform: `translate(${left}px, ${top}px)`
            }}
          >
            <polygon
              onMouseDown={this.mousedownDrag}
              style={{
                fill: bgFill,
                stroke: dashFill,
                strokeDasharray: '3,3',
                strokeWidth: 0.5
              }}
              points={`0,0 ${width},0 ${width},${height} 0,${height}`}
            />
            {dotsData.map((elem, index) => {
              return (
                <rect
                  key={index}
                  x={elem.x}
                  y={elem.y}
                  width={elem.width}
                  height={elem.height}
                  onMouseDown={e => this.mousedownZoom(e, elem.type)}
                  style={{
                    transform: `translate(-${elem.width / 2}px, -${elem.height / 2}px)`,
                    fill
                  }}
                />
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}
