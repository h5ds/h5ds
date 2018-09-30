import Editor from './Editor';
import { Origindata } from './Origindata';
import React from 'react';
import { didMount } from './didMount';
import { layerdom } from './layerdom';

export default {
  type: 'dom',
  name: 'DOM',
  icon: <i className="h5ds-ico h5ds-ico-domnode" />,
  editor: Editor, // 图层独有的编辑区域
  layerdom, // 图层对应生成的HTML
  origindata: Origindata, // 图层对应的json数据
  didMount // 图层挂载后执行
};
