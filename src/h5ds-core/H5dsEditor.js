// 载入公共样式
import './less/animate.less';
import './less/animations.less';
import './less/h5ds.app.less';
import './less/initialize.less';
import './less/initantd.less';
import './less/utils.less';
// 载入jquery插件
import './utils/contextmenu.js'; // 鼠标右键插件
import './utils/control.js'; // 控制器插件
import './utils/drag.js'; // 拖动插件
import './utils/dragsort.js'; // 拖动排序插件
import './utils/help.js'; // 帮助插件
import './utils/transform.js'; // transform css插件

import App from './components';
import { Provider } from 'mobx-react';
import React from 'react';
import stores from './store';

export default class H5dsEditor extends React.Component {
  componentDidMount() {
    console.log('start h5ds editor!');
  }
  render() {
    return (
      <Provider {...stores}>
        <App {...this.props} />
      </Provider>
    );
  }
}
