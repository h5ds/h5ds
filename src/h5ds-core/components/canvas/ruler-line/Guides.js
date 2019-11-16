import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';

/**
 *  重绘标尺会导致guides重新绘制
 */
export default class Guides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guides: []
    };
  }

  /**
   * @desc 过滤小于0的线条删除掉，当线条被拖动到了边界上，会自动销毁掉
   */
  @bindSelf
  filterLine() {
    const newLines = [];
    this.state.guides.forEach(elem => {
      if (elem.type === 'col') {
        if (elem.style.left >= 0 && elem.style.left <= this.props.canvasWidth) {
          newLines.push(elem);
        }
      } else {
        if (elem.style.top >= 0 && elem.style.top <= this.props.canvasHeight) {
          newLines.push(elem);
        }
      }
    });
    this.setState({
      guides: newLines
    });
  }

  /**
   * @desc 拖动线开始
   * @param {event} e
   * @param {object} elem guides 的 child
   */
  @bindSelf
  guidesMousedown(e, elem) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const startx = e.pageX;
    const starty = e.pageY;
    const oldleft = elem.style.left;
    const oldtop = elem.style.top;
    const guides = this.state.guides;
    $(document)
      .on('mousemove.h5ds.ruler.line', em => {
        elem.type === 'col' ? (elem.style.left = em.pageX - startx + oldleft) : (elem.style.top = em.pageY - starty + oldtop);
        this.setState({ guides });
      })
      .on('mouseup.h5ds.rulerline', () => {
        if (elem.type === 'row') {
          let left = $('.h5ds-canvas-realsize').position().left;
          elem.value = (elem.style.left - left) / this.props.phoneScale;
        } else {
          // 设置相对位置
          let top = $('.h5ds-canvas-realsize').position().top;
          elem.value = (elem.style.top - top) / this.props.phoneScale;
        }
        this.filterLine();
        $(document).off('mousemove.h5ds.ruler.line mouseup.h5ds.ruler.line');
      });
  }

  /**
   * @desc 行：线
   * @param {event} e 事件对象
   */
  @bindSelf
  rowMousedown(e) {
    e.stopPropagation();
    const line = {
      id: util.randomID(),
      type: 'row',
      style: {
        left: 0,
        top: 0,
        height: 1,
        width: $('#h5dsCanvas').width()
      }
    };
    const { guides } = this.state;
    guides.push(line);
    const start = e.pageY;
    $(document)
      .on('mousemove.h5ds.ruler', em => {
        line.style.top = em.pageY - start;
        this.setState({ guides });
      })
      .on('mouseup.h5ds.ruler', () => {
        // 设置相对位置
        let top = $('.h5ds-canvas-realsize').position().top;
        line.value = (line.style.top - top) / this.props.phoneScale;

        this.filterLine();
        $(document).off('mousemove.h5ds.ruler mouseup.h5ds.ruler');
      });
  }

  /**
   * @desc 列：线
   * @param {event} e 事件对象
   */
  @bindSelf
  colMousedown(e) {
    e.stopPropagation();
    const line = {
      id: util.randomID(),
      type: 'col',
      style: {
        left: 0,
        top: 0,
        width: 1,
        height: 2000
      }
    };
    const { guides } = this.state;
    guides.push(line);
    const start = e.pageX;
    let left = $('.h5ds-canvas-realsize').position().left;
    $(document)
      .on('mousemove.h5ds.ruler', em => {
        line.style.left = em.pageX - start;
        this.setState({ guides });
      })
      .on('mouseup.h5ds.ruler', () => {
        // 设置相对位置
        line.value = (line.style.left - left) / this.props.phoneScale;
        this.filterLine();
        $(document).off('mousemove.h5ds.ruler mouseup.h5ds.ruler');
      });
  }

  componentDidMount() {
    $(document).on('mousedown.h5ds.h5dsRulerCol', '#h5dsRulerCol', this.colMousedown);
    $(document).on('mousedown.h5ds.h5dsRulerRow', '#h5dsRulerRow', this.rowMousedown);

    window.pubSubEditor.subscribe('h5ds.ruler.drawline', data => {
      if (this.data === JSON.stringify(data)) {
        return false;
      }
      this.data = JSON.stringify(data);

      // 计算相对位置
      const { type, value, phoneScale } = data;
      const guides = this.state.guides;
      guides.forEach(elem => {
        // x 轴方向
        if (type === 'col' && elem.type === 'row') {
          elem.style.top = value + elem.value * phoneScale;
        } else if (type === 'row' && elem.type === 'col') {
          elem.style.left = value + elem.value * phoneScale;
        }
      });
      this.setState({ guides });
    });
  }

  componentWillUnmount() {
    $(document).off('mousedown.h5ds.h5dsRulerCol mousedown.h5ds.h5dsRulerRow');
    window.pubSubEditor.unsubscribe('h5ds.ruler.drawline');
  }

  render() {
    return (
      <React.Fragment>
        {this.state.guides.map(elem => {
          return <li onMouseDown={e => this.guidesMousedown(e, elem)} className={'h5ds-ruler-guides h5ds-ruler-guides-' + elem.type} key={elem.id} style={{ ...elem.style }} />;
        })}
      </React.Fragment>
    );
  }
}
