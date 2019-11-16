import './ruler-line.less';

import React, { Component } from 'react';
import { bindSelf } from '../../../utils';

import Guides from './Guides';
import MoveRuler from './MoveRuler';

/**
 * 采用canvas 绘制标线 { canvasHeight, canvasWidth, phoneScale, top, left }
 * row 行
 * col 纵
 */
export default class RulerLine extends Component {
  constructor(props) {
    super(props);
    this.lineWidth = 24; // 宽度
    this.eachWidth = 5; // 长线和短线间隔
    this.size = 10; // 最小刻度
    this.minLine = 5; // 小线段长度
    this.maxLine = 12; // 长线段长度
    this.calibration = this.size * props.phoneScale; // 刻度,以像素为单位的刻度
  }

  /**
   * 绘制刻度
   * @param {context} ctx canvas context对象
   * @param {dom} target dom
   * @param {object} size 画布的宽高 {width, height}
   * @param {string} type col | row
   * @param {number} value 起点位置，如果是col 对应的就是 top， 如果是row 对应的是 left
   */
  @bindSelf
  drawLine(ctx, target, size, type, value) {
    const { phoneScale } = this.props;
    value = parseInt(value, 10);
    // 重绘标尺会导致 标线也发生变化
    window.pubSubEditor.publish('h5ds.ruler.drawline', { type, value, phoneScale });

    if (!ctx) {
      ctx = target.getContext('2d');
      ctx.font = '9px normal';
    } else {
      ctx.clearRect(0, 0, size.width, size.height);
    }
    ctx.strokeStyle = '#748392'; // 线条颜色
    ctx.fillStyle = '#748392'; // 文字颜色

    if (type === 'row') {
      let len = parseInt((size.width - value) / this.calibration, 10);
      if (len < 0) {
        return;
      }
      // 绘制线条
      new Array(len).fill(1).forEach((d, i) => {
        let x = i * this.calibration + 0.5; // + 0.5 是为了解决1px线条模糊的问题
        ctx.beginPath();
        ctx.moveTo(x + value, 0);
        ctx.lineTo(x + value, i % this.eachWidth === 0 ? this.maxLine : this.minLine);
        ctx.stroke();
        ctx.closePath();
        if (i % this.eachWidth === 0) {
          ctx.fillText(parseInt((i * this.calibration) / phoneScale, 10), x + value, this.lineWidth - 4);
        }

        // 同时绘制左边的线条
        if (i < value / this.calibration && i !== 0) {
          ctx.beginPath();
          ctx.moveTo(value - x, 0);
          ctx.lineTo(value - x, i % this.eachWidth === 0 ? this.maxLine : this.minLine);
          ctx.stroke();
          ctx.closePath();
          if (i % this.eachWidth === 0) {
            ctx.fillText(parseInt((-i * this.calibration) / phoneScale, 10), value - x, this.lineWidth - 4);
          }
        }
      });
    } else {
      // 如果是y轴方向的刻度
      let len = parseInt((size.height - value) / this.calibration, 10);
      if (len < 0) {
        return;
      }
      // 绘制线条
      new Array(len).fill(1).forEach((d, i) => {
        let y = i * this.calibration + 0.5; // + 0.5 是为了解决1px线条模糊的问题
        ctx.beginPath();
        ctx.moveTo(0, y + value);
        ctx.lineTo(i % this.eachWidth === 0 ? this.maxLine : this.minLine, y + value);
        ctx.stroke();
        ctx.closePath();

        if (i % this.eachWidth === 0) {
          ctx.save();
          ctx.translate(this.lineWidth - 10, y + value);
          ctx.rotate(Math.PI / 2);
          ctx.fillText(parseInt((i * this.calibration) / phoneScale, 10), 0, 0);
          ctx.restore();
        }

        // 同时绘制上边的线条
        if (i < value / this.calibration && i !== 0) {
          ctx.beginPath();
          ctx.moveTo(0, value - y);
          ctx.lineTo(i % this.eachWidth === 0 ? this.maxLine : this.minLine, value - y);
          ctx.stroke();
          ctx.closePath();
          if (i % this.eachWidth === 0) {
            ctx.save();
            ctx.translate(this.lineWidth - 10, value - y);
            ctx.rotate(Math.PI / 2);
            ctx.fillText(parseInt((-i * this.calibration) / phoneScale), 0, 0);
            ctx.restore();
          }
        }
      });
    }

    return ctx;
  }

  // 绘制x 方向的线条
  @bindSelf
  drawRowLine(left, canvasWidth) {
    this.rowCtx = this.drawLine(
      this.rowCtx,
      this.rowRef,
      {
        width: canvasWidth,
        height: this.lineWidth
      },
      'row',
      left
    );
  }

  // 绘制y 方向的线条
  @bindSelf
  drawColLine(top, canvasHeight) {
    this.colCtx = this.drawLine(
      this.colCtx,
      this.colRef,
      {
        width: this.lineWidth,
        height: canvasHeight
      },
      'col',
      top
    );
  }

  componentDidMount() {
    const { canvasHeight, canvasWidth, phoneScale, top, left } = this.props;
    this.calibration = this.size * phoneScale;
    this.drawRowLine(left, canvasWidth);
    this.drawColLine(top, canvasHeight);

    // 导航器触发的
    window.pubSubEditor.subscribe('h5ds.rulerline.position', data => {
      data.left && this.drawRowLine(data.left, canvasWidth);
      data.top && this.drawColLine(data.top, canvasHeight);
    });
  }

  componentDidUpdate() {
    const { canvasHeight, canvasWidth, phoneScale, top, left } = this.props;
    this.calibration = this.size * phoneScale;
    this.drawRowLine(left, canvasWidth);
    this.drawColLine(top, canvasHeight);
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.rulerline.position');
  }

  render() {
    const { canvasHeight, canvasWidth, phoneScale } = this.props;
    return (
      <div className="h5ds-ruler-line">
        <canvas id="h5dsRulerCol" ref={c => (this.colRef = c)} width={this.lineWidth} height={canvasHeight} />
        <canvas id="h5dsRulerRow" ref={c => (this.rowRef = c)} width={canvasWidth} height={this.lineWidth} />
        <Guides {...{ canvasHeight, canvasWidth, phoneScale }} />
        <MoveRuler lineWidth={this.lineWidth} />
      </div>
    );
  }
}
