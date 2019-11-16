import './layer.less';

import React, { Component } from 'react';
import { renderIn } from '../../../config';
import { bindSelf } from '../../../utils/bindSelf';
import { util } from '../../../utils/util';
import { config } from './config';

/**
 * 图层组件
 * renderIn,
 * layer,
 * plugins { pluginsKey }
 */
class LayerComp extends Component {
  constructor(props) {
    super(props);
    this.soundId = 'id_' + util.randomID();
    const { data } = props.layer;

    this.state = {
      status: data.autoplay ? 'play' : 'pause' // pause
    };
  }

  @bindSelf
  doMusic(status) {
    if (!status) {
      status = this.state.status;
    }
    const { layer } = this.props;
    if ([renderIn.RENDER_IN_PREVIEW, renderIn.RENDER_IN_CANVAS, renderIn.RENDER_IN_PUBLISH].includes(this.props.renderIn)) {
      if (status === 'play') {
        this.temp && clearTimeout(this.temp);
        this.setState({ status: 'pause' }, () => {
          document.getElementById(this.soundId).pause();
        });
      } else {
        this.temp = setTimeout(() => {
          this.setState({ status: 'play' }, () => {
            const myAudio = document.getElementById(this.soundId);
            myAudio.play();
          });
        }, parseFloat(layer.data.delay) * 1000 || 1);
      }
    }
  }

  @bindSelf
  clickMusic() {
    if (this.props.renderIn !== renderIn.RENDER_IN_CANVAS) {
      this.doMusic();
    }
  }

  componentDidMount() {
    const { data } = this.props.layer;
    if (data.autoplay && this.props.renderIn !== renderIn.RENDER_IN_CANVAS) {
      this.doMusic(this.state.status === 'play' ? 'pause' : 'play');
    }
  }

  componentWillUnmount() {
    document.getElementById(this.soundId).pause();
    this.temp && clearTimeout(this.temp);
  }

  render() {
    const { layer } = this.props;
    const { status } = this.state;
    let iconReactDom = null;
    switch (layer.data.icon) {
      case 'default':
        iconReactDom = (
          <div
            onClick={this.clickMusic}
            style={{
              transform: `scale(${layer.style.width / 26}, ${layer.style.height / 26})`
            }}
            className={status === 'play' ? 'h5ds_sound-icon h5ds_sound-iconing' : 'h5ds_sound-icon'}
          >
            <i />
            <i />
            <i />
            <i />
          </div>
        );
        break;
      case 'null': // 无图标
        iconReactDom = null;
        break;
      default:
        iconReactDom = <img src={layer.data.icon} />;
    }

    return (
      <div ref={c => (this.innerLayerRef = c)} className="layer-h5ds_sound-inner">
        {iconReactDom}
        <audio id={this.soundId} autoPlay={false} preload="preload" loop={layer.data.loop}>
          <source src={layer.data.sound} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

export { LayerComp, config };
