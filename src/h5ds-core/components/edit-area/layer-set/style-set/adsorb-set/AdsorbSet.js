import './adsorbset.less';

import React, { Component } from 'react';
import { SetItem } from '../../../../../../h5ds-components/item';
import { bindSelf } from '../../../../../utils';
import { inject, observer } from 'mobx-react';

import { Switch } from 'antd';

@inject('h5ds', 'scope')
@observer
class AdsorbSet extends Component {
  constructor(props) {
    super(props);
    this.layer = props.h5ds.getLayer();
    this.state = {
      checked: this.layer.adsorb ? true : false,
      active: `h5ds-adsorbset-${this.layer.adsorb}`
    };
  }

  @bindSelf
  onChange(checked) {
    this.setState({ checked });
    this.layer.adsorb = '';
  }

  @bindSelf
  setAdsorb(active) {
    this.setState({ active });
    this.layer.adsorb = active.replace('h5ds-adsorbset-', '');
  }

  render() {
    const classes = [
      'h5ds-adsorbset-top-left',
      'h5ds-adsorbset-top-center',
      'h5ds-adsorbset-top-right',
      'h5ds-adsorbset-left-center',
      'h5ds-adsorbset-right-center',
      'h5ds-adsorbset-bottom-left',
      'h5ds-adsorbset-bottom-center',
      'h5ds-adsorbset-bottom-right'
    ];
    const { checked, active } = this.state;
    const { editorConfig = {} } = this.props.scope.pluginsKey[this.layer.pid] || {};
    return (
      <div className="h5ds-adsorbset">
        {editorConfig.adsorb !== false && (
          <SetItem name="外框吸附">
            <Switch checked={checked} onChange={this.onChange} />
            {checked ? (
              <React.Fragment>
                <div className="h5ds-adsorbset-tips">外框吸附说明：吸附效果会根据整个视图区域进行定位，选择一个相对的对齐点</div>
                <div className="h5ds-adsorbset-dots">
                  {classes.map(d => {
                    let cls = [d];
                    if (d === active) {
                      cls.push('h5ds-adsorbset-active');
                    }
                    return <a onClick={() => this.setAdsorb(d)} key={d} className={cls.join(' ')} />;
                  })}
                </div>
              </React.Fragment>
            ) : null}
          </SetItem>
        )}
      </div>
    );
  }
}

export default AdsorbSet;
