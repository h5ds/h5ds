import Editor from './Editor';
import { Origindata } from './Origindata';
import React from 'react';
import { didMount } from './didMount';
import { layerdom } from './layerdom';

export default {
  type: 'qrcode',
  name: '二维码',
  icon: <i className="h5ds ico5-toumingdu" />,
  editor: Editor, // 图层独有的编辑区域
  layerdom, // 图层对应生成的HTML
  origindata: Origindata, // 图层对应的json数据
  didMount // 图层挂载后执行
};
