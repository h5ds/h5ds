import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import TimeLine from './TimeLine';
import { bindSelf } from '../../utils';
import { transaction } from 'mobx';

/**
 * @desc 帧动画编辑工具是专门针对帧动画layer的。这里的列表只显示帧动画的列表。并不是所有的layer
 */
@inject('h5ds')
@observer
class TimeLineBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.h5ds.edata.timeLineHeight
    };
  }

  // 设置高度
  @bindSelf
  setTimeLineHeight(e) {
    const startY = e.pageY;
    const $h5dsCenter = $('.h5ds-center');
    const $h5dsCanvas = $('#h5dsCanvas');
    let { timeLineHeight, headerHeight } = this.props.h5ds.edata;
    const winHeight = $(window).height();
    const minHeight = 14; // 最小高度
    const maxHeight = winHeight - headerHeight; // 最大高度
    const { height } = this.state;
    let newCanvasHeight = winHeight - headerHeight - timeLineHeight;
    $(document)
      .on('mousemove.timeline.height', em => {
        let ey = em.pageY - startY;
        timeLineHeight = height - ey;
        if (timeLineHeight > maxHeight) {
          timeLineHeight = maxHeight;
        } else if (timeLineHeight < minHeight) {
          timeLineHeight = minHeight;
        }
        newCanvasHeight = winHeight - headerHeight - timeLineHeight;
        this.setState({ height: timeLineHeight });
        $h5dsCanvas.css({ height: newCanvasHeight });
        $h5dsCenter.css({ height: newCanvasHeight });
      })
      .on('mouseup.timeline.height', () => {
        transaction(() => {
          this.props.h5ds.edata.timeLineHeight = timeLineHeight;
          this.props.h5ds.edata.canvasHeight = newCanvasHeight;
        });
        this.setState({ height: timeLineHeight });
        $(document).off('mousemove.timeline.height mouseup.timeline.height');
      });
  }

  render() {
    const { height } = this.state;
    return (
      <div style={{ height }} className="h5ds-timeline-box">
        <TimeLine show={height === 14} setTimeLineHeight={this.setTimeLineHeight} />
      </div>
    );
  }
}

export default TimeLineBox;
