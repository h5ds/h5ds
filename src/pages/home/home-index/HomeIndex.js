import './home-index.less';
import 'h5ds/editor/style.css';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import H5dsEditor from 'h5ds';
import ImageList from './ImageList';

// 载入自定义插件
import '../../../plugins/demo';

@inject('user')
@observer
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  /**
   * 保存APP
   */
  saveApp = async data => {
    console.log('saveApp ->', data);
  };

  /**
   * 发布 app
   */
  publishApp = async data => {
    console.log('publshApp ->', data);
  };

  componentDidMount() {
    // 模拟异步加载数，设置 defaultData 会默认加载一个初始化数据
    setTimeout(() => {
      this.setState({ data: 'defaultData' });
    }, 100);
  }

  /**
   * 使用编辑器部分
   */
  render() {
    const { data } = this.state;
    // const { H5dsEditor } = H5DS_GLOBAL.editor;
    return (
      <H5dsEditor
        plugins={[]} // 第三方插件包
        data={data}
        debugger={false} // debugger=true用于调试插件
        options={{
          noServer: true, // 开启无后台模式
          imageSourceModal: ImageList,
          // pluginsHost: 'https://www.h5ds.com',
          publishApp: this.publishApp,
          saveApp: this.saveApp, // 保存应用
          appId: 'test_app_id' // 当前appId
        }}
      />
    );
  }
}

export default Editor;
