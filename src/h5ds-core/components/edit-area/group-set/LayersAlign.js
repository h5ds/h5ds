import './groupset.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils'; // 获取外框
import { inject, observer } from 'mobx-react';

import { transaction } from 'mobx';

@inject('h5ds')
@observer
class LayerSetAlign extends Component {
  // 左对齐
  @bindSelf
  alignLeft() {
    const uniqs = this.props.getSortGroups((a, b) => {
      return a.box.left - b.box.left;
    });
    let minleft = 0;
    transaction(() => {
      uniqs.forEach((elem, index) => {
        if (index === 0) {
          minleft = elem.box.left;
        } else {
          // center.left - boxWidth / 2 = 外框的left
          elem.layer.style.left = minleft + elem.box.boxWidth / 2 - elem.box.width / 2;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 右对齐
  @bindSelf
  alignRight() {
    // 通过 left + width 排序
    const uniqs = this.props.getSortGroups((a, b) => {
      return b.box.left + b.box.boxWidth - (a.box.left + a.box.boxWidth);
    });
    let maxleft = 0;
    transaction(() => {
      uniqs.forEach((elem, index) => {
        if (index === 0) {
          maxleft = elem.box.left + elem.box.boxWidth;
        } else {
          elem.layer.style.left = maxleft - elem.box.boxWidth / 2 - elem.box.width / 2;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 上对齐
  @bindSelf
  alignTop() {
    const uniqs = this.props.getSortGroups((a, b) => {
      return a.box.top - b.box.top;
    });
    let mintop = 0;
    transaction(() => {
      uniqs.forEach((elem, index) => {
        if (index === 0) {
          mintop = elem.box.top;
        } else {
          elem.layer.style.top = mintop + elem.box.boxHeight / 2 - elem.box.height / 2;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 下对齐
  @bindSelf
  alignDown() {
    // 通过 top + height 排序
    const uniqs = this.props.getSortGroups((a, b) => {
      return b.box.top + b.box.boxHeight - (a.box.top + a.box.boxHeight);
    });
    let maxtop = 0;
    transaction(() => {
      uniqs.forEach((elem, index) => {
        if (index === 0) {
          maxtop = elem.box.top + elem.box.boxHeight;
        } else {
          elem.layer.style.top = maxtop - elem.box.boxHeight / 2 - elem.box.height / 2;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 水平居中
  @bindSelf
  horizontalCenter() {
    const uniqs = this.props.getSortGroups((a, b) => {
      return a.box.left - b.box.left;
    });
    // 找到第一个dom。然后根据第一个dom进行定位
    transaction(() => {
      let lineTop = 0; // 中线的top
      uniqs.forEach((elem, index) => {
        const { top, height } = elem.layer.style;
        if (index === 0) {
          lineTop = top + height / 2;
        } else {
          elem.layer.style.top = lineTop - height / 2;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 垂直居中
  @bindSelf
  verticalCenter() {
    const uniqs = this.props.getSortGroups((a, b) => {
      return a.layer.style.top - b.layer.style.top;
    });
    // 找到第一个dom。然后根据第一个dom进行定位
    transaction(() => {
      let lineLeft = 0; // 中线的left
      uniqs.forEach((elem, index) => {
        const { left, width } = elem.layer.style;
        if (index === 0) {
          lineLeft = left + width / 2;
        } else {
          elem.layer.style.left = lineLeft - width / 2;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 垂直均分
  @bindSelf
  verticalSplit() {
    const uniqs = this.props.getSortGroups((a, b) => {
      return a.layer.style.top - b.layer.style.top;
    });
    // 求出间隔多少
    const lastUniq = uniqs[uniqs.length - 1];
    // 总间距
    let totalMargin = lastUniq.layer.style.top + lastUniq.layer.style.height - uniqs[0].layer.style.top;
    // 总宽度
    let totalHeight = 0;
    uniqs.forEach(elem => {
      totalHeight += elem.layer.style.height;
    });
    let eachMargin = (totalMargin - totalHeight) / (uniqs.length - 1);
    transaction(() => {
      uniqs.forEach((elem, index) => {
        if (index !== 0) {
          let prevUniq = uniqs[index - 1];
          elem.layer.style.top = prevUniq.layer.style.top + prevUniq.layer.style.height + eachMargin;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 水平均分
  @bindSelf
  horizontalSplit() {
    const uniqs = this.props.getSortGroups((a, b) => {
      return a.layer.style.left - b.layer.style.left;
    });
    // 求出间隔多少
    const lastUniq = uniqs[uniqs.length - 1];
    // 总间距
    let totalMargin = lastUniq.layer.style.left + lastUniq.layer.style.width - uniqs[0].layer.style.left;
    // 总宽度
    let totalWidth = 0;
    uniqs.forEach(elem => {
      totalWidth += elem.layer.style.width;
    });
    let eachMargin = (totalMargin - totalWidth) / (uniqs.length - 1);
    transaction(() => {
      uniqs.forEach((elem, index) => {
        if (index !== 0) {
          let prevUniq = uniqs[index - 1];
          elem.layer.style.left = prevUniq.layer.style.left + prevUniq.layer.style.width + eachMargin;
        }
      });
      this.props.h5ds.edata.keys = util.randomID();
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 随机分布
  @bindSelf
  randomDistrib() {
    const uniqs = this.props.getSortGroups();
    const { getPage } = this.props.h5ds;
    const page = getPage();
    transaction(() => {
      uniqs.forEach(elem => {
        elem.layer.style.left = util.randomNumber(-20, page.style.width + 20 - elem.layer.style.width);
        elem.layer.style.top = util.randomNumber(-20, 20 + page.style.height - elem.layer.style.height);
      });
      this.props.h5ds.edata.keys = util.randomID();
    });
  }

  // 随机大小
  @bindSelf
  randomSize() {
    const uniqs = this.props.getSortGroups();
    transaction(() => {
      uniqs.forEach(elem => {
        let oldHeight = elem.layer.style.height;
        let oldWidth = elem.layer.style.width;
        elem.layer.style.height = util.randomNumber(10, 40);
        elem.layer.style.width = elem.layer.style.height * (oldWidth / oldHeight);
      });
      this.props.h5ds.edata.keys = util.randomID();
    });
  }

  componentDidMount() {
    window.pubSubEditor.subscribe('h5ds.shortcuts_y', num => {
      const uniqs = this.props.getSortGroups();
      transaction(() => {
        uniqs.forEach(elem => {
          elem.layer.style.top += num;
        });
        window.pubSubEditor.publish('h5ds.setHistory');
      });
    });

    window.pubSubEditor.subscribe('h5ds.shortcuts_x', num => {
      const uniqs = this.props.getSortGroups();
      transaction(() => {
        uniqs.forEach(elem => {
          elem.layer.style.left += num;
        });
        window.pubSubEditor.publish('h5ds.setHistory');
      });
    });
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_y');
    window.pubSubEditor.unsubscribe('h5ds.shortcuts_x');
  }

  render() {
    return (
      <ul>
        <li className="h5ds-item" onClick={this.alignLeft}>
          <i className="h5ds-ico h5ds-ico-duiqi" /> <span>左对齐</span>
        </li>
        <li className="h5ds-item" onClick={this.alignRight}>
          <i className="h5ds-ico h5ds-ico-duiqi_youduiqi" /> <span>右对齐</span>
        </li>
        <li className="h5ds-item" onClick={this.alignTop}>
          <i className="h5ds-ico h5ds-ico-duiqi_xiangxia" /> <span>上对齐</span>
        </li>
        <li className="h5ds-item" onClick={this.alignDown}>
          <i className="h5ds-ico h5ds-ico-duiqi_xiangshang" /> <span>下对齐</span>
        </li>
        <li className="h5ds-item" onClick={this.horizontalCenter}>
          <i className="h5ds-ico h5ds-ico-duiqi_hengxiangjuzhong" /> <span>水平居中</span>
        </li>
        <li className="h5ds-item" onClick={this.verticalCenter}>
          <i className="h5ds-ico h5ds-ico-duiqi_juzhong" /> <span>垂直居中</span>
        </li>
        <li className="h5ds-item" onClick={this.verticalSplit}>
          <i className="h5ds-ico h5ds-ico-meun" /> <span>垂直均分</span>
        </li>
        <li className="h5ds-item" onClick={this.horizontalSplit}>
          <i className="h5ds-ico h5ds-ico-caidan1" /> <span>水平均分</span>
        </li>
        <li className="h5ds-item" onClick={this.randomDistrib}>
          <i className="h5ds-ico h5ds-ico-ttpodicon" /> <span>随机分布</span>
        </li>
        <li className="h5ds-item" onClick={this.randomSize}>
          <i className="h5ds-ico h5ds-ico-fenbushinengyuan" /> <span>随机大小</span>
        </li>
      </ul>
    );
  }
}

export default LayerSetAlign;
