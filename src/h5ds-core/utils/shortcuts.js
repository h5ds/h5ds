import { pubsubEvent } from '../utils';

// 快捷按钮操作
export function shortcuts() {
  $(document).on('keydown.shortcuts', ev => {
    ev = window.event || ev;
    let code = ev.keyCode;

    // 这里加个锁
    if ($(':focus').length !== 0) {
      return;
    }

    if (ev.ctrlKey && [83, 90, 89, 189, 187, 80, 75, 71, 72, 67, 85, 86].indexOf(code) !== -1) {
      ev.preventDefault();
      ev.stopPropagation();
      switch (code) {
        case 83:
          pubsubEvent.publish('h5ds.shortcuts_save');
          break; // ctrl+s 保存APP
        case 90:
          pubsubEvent.publish('h5ds.shortcuts_undo');
          break; // ctrl+z 撤销
        case 89:
          pubsubEvent.publish('h5ds.shortcuts_redo');
          break; // ctrl+y 恢复
        case 189:
          pubsubEvent.publish('h5ds.shortcuts_tomin');
          break; // ctrl+ - 缩小画布
        case 187:
          pubsubEvent.publish('h5ds.shortcuts_tomax');
          break; // ctrl+ + 放大画布
        case 80:
          pubsubEvent.publish('h5ds.shortcuts_play');
          break; // ctrl+ p 播放动画
        case 71:
          pubsubEvent.publish('h5ds.shortcuts_combin');
          break; // ctrl+ g 合并图层
        case 72:
          pubsubEvent.publish('h5ds.shortcuts_grid');
          break; // ctrl+ h 显示网格
        case 85:
          pubsubEvent.publish('h5ds.shortcuts_uncombin');
          break; // ctrl+ v 粘贴
        case 86:
          pubsubEvent.publish('h5ds.shortcuts_pastelayer');
          break; // ctrl+ v 粘贴
        case 67:
          pubsubEvent.publish('h5ds.shortcuts_copylayer');
          break; // ctrl+ c 复制
      }
      return;
    }

    // 删除
    if (code === 46) {
      ev.preventDefault();
      pubsubEvent.publish('h5ds.shortcuts_dellayer');
      return;
    }

    // 上下左右切换
    if ([38, 40, 37, 39].indexOf(code) !== -1) {
      ev.preventDefault();
      ev.stopPropagation();

      let num = 1;
      if (ev.shiftKey) {
        num = 20;
      }

      switch (code) {
        case 38:
          pubsubEvent.publish('h5ds.shortcuts_y', -num);
          break; // 上
        case 37:
          pubsubEvent.publish('h5ds.shortcuts_x', -num);
          break; // 左
        case 39:
          pubsubEvent.publish('h5ds.shortcuts_x', num);
          break; // 右
        case 40:
          pubsubEvent.publish('h5ds.shortcuts_y', num);
          break; // 下
      }
      return;
    }
  });
}
