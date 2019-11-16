import './loadingBox.less';

import React, { Component } from 'react';

import Loading from '../../../h5ds-components/loading';
import { Progress } from 'antd';

/**
 * @desc loading 模块
 * props: data, complete 资源载入完成
 */
export default class LoadingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      sourceName: 'h5ds.core.js'
    };
  }

  componentDidMount() {
    const { appData } = this.props;

    console.log('init script and plugins events', appData);

    if (appData) {
      // 资源占比 70%
      window.pubSubEditor.subscribe('h5ds.load.plugins', data => {
        // console.log('h5ds.load.plugins progress:', data);
        const { count, index, progress, name } = data;
        const percent = parseInt(progress * 100 * 0.7, 10);
        if (count === 0) {
          this.setState({ percent, name: 'plugins资源加载完成' });
        } else if (count !== 0 && count === index + 1) {
          this.setState({ percent, name: 'plugins资源加载完成' });
        } else {
          this.setState({ percent, sourceName: name });
        }
      });

      // 资源占比30%
      window.pubSubEditor.subscribe('h5ds.load.scripts', data => {
        // console.log('h5ds.load.scripts progress:', data);
        const { count, index, progress, name } = data;
        const percent = parseInt(progress * 100 * 0.3 + 70, 10);
        if (count === 0) {
          this.setState({ percent, name: 'scripts资源加载完成' });
        } else if (count !== 0 && count === index + 1) {
          this.setState({ percent, name: 'scripts资源加载完成' });
        } else {
          this.setState({ percent, sourceName: name });
        }
      });
    } else {
      console.error('数据异常');
    }
  }

  componentWillUnmount() {
    this.hasUnmount = true;
    window.pubSubEditor.unsubscribe('h5ds.load.scripts');
  }

  render() {
    const { percent, sourceName } = this.state;
    return (
      <Loading
        body={
          <div className="h5ds-loading-box">
            <Progress
              strokeWidth={1}
              format={percent => {
                return (
                  <div className="h5ds-loading-percent">
                    资源载入
                    {percent}% <br />
                    <span className="h5ds-loading-info">{sourceName}</span>
                  </div>
                );
              }}
              width={200}
              type="circle"
              percent={percent}
            />
          </div>
        }
      />
    );
  }
}
