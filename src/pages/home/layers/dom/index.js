import { Origindata, layerdom } from './layer';

import Editor from './Editor';
import React from 'react';
import { didMount } from './didMount';

export default {
    type: 'dom',
    name: 'DOM',
    icon: <i className="h5ds ico5-domnode" />,
    editor: Editor, // 图层独有的编辑区域
    layerdom, // 图层对应生成的HTML
    origindata: Origindata, // 图层对应的json数据
    didMount // 图层挂载后执行
};
