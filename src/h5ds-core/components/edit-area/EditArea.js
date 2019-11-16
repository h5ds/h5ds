import './editarea.less';

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import AppSet from './app-set';
import GroupSet from './group-set';
import LayerSet from './layer-set';
import PageSet from './page-set';

// import { bindSelf } from '../../utils';

@inject('h5ds')
@observer
class EditArea extends Component {
  render() {
    let { setType, selectType, selectFixed, selectPage, selectPopup } = this.props.h5ds.edata;
    // console.log('更新setting区域');
    let ReactDom = null;
    switch (setType) {
      case 'layer':
        ReactDom = <LayerSet />;
        break;
      case 'group':
        ReactDom = <GroupSet />;
        break;
      case 'page':
        ReactDom = <PageSet key={selectType + selectFixed + selectPage + selectPopup} />;
        break;
      case 'app':
        ReactDom = <AppSet />;
        break;
    }
    return <div className="h5ds-editarea h5ds-js-setting">{ReactDom}</div>;
  }
}

export default EditArea;
