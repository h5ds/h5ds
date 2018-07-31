import { test, testHTML } from './layer';

import React from 'react';
import TestEditor from './TestEditor';
import { testDidMount } from './didMount';

export default {
  type: 'test',
  name: '测试',
  icon: <i className="h5ds ico5-domnode" />,
  editor: TestEditor, // 图层独有的编辑区域
  layerdom: testHTML, // 图层对应生成的HTML
  origindata: test, // 图层对应的json数据
  didMount: testDidMount // 图层挂载后执行
};
