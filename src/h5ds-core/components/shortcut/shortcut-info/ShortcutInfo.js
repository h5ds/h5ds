import React, { Component } from 'react';

import { Popover } from 'antd';

export default class ShortcutInfo extends Component {
  render() {
    return (
      <Popover
        placement="left"
        title="快捷键说明"
        content={
          <ul>
            <li>delete 删除</li>
            <li>ctrl+s 保存预览APP</li>
            <li>ctrl+c 复制图层</li>
            <li>ctrl+v 粘贴图层</li>
            <li>ctrl+z 撤销</li>
            <li>ctrl+y 恢复</li>
            <li>ctrl+y 恢复</li>
            <li>ctrl+'-' 缩小画布</li>
            <li>ctrl+'+' 放大画布</li>
            <li>ctrl+p 播放动画</li>
            <li>ctrl+h 显示网格</li>
            <li>ctrl+g 合并图层</li>
            <li>ctrl+u 取消合并</li>
            <li>ctrl+上/下/左/右 大范围移动</li>
            <li>上/下/左/右 小范围移动</li>
          </ul>
        }
        trigger="click"
      >
        <span>
          <a>
            <i className="h5ds-ico h5ds-ico-kuaijiejian" />
          </a>
          <span>快捷键</span>
        </span>
      </Popover>
    );
  }
}
