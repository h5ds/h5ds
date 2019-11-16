import './editor.less';

import { Button, InputNumber, Switch, message } from 'antd';
import { LoadSource, WinLoad, bindSelf, util } from '../../../utils';
import React, { Component } from 'react';
import { SetGrid, SetItem } from '../../../../h5ds-components/item';

// import SoundItem from './SoundItem';
import { transaction } from 'mobx';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: util.randomID()
    };
    this.loadSource = new LoadSource();
  }

  @bindSelf
  changeDelay(val) {
    this.props.layer.data.delay = val;
    this.setState({ keys: util.randomID() });
  }

  @bindSelf
  autoPlayDo(val) {
    this.props.layer.data.autoplay = val;
    this.setState({ keys: util.randomID() });
  }

  // 是否开启icon
  @bindSelf
  changeMusicIcon(checked) {
    transaction(() => {
      if (checked) {
        this.props.layer.data.icon = 'default';
      } else {
        this.props.layer.data.icon = 'null';
      }
      this.props.h5ds.edata.keys = util.randomID();
      this.setState({ keys: util.randomID() });
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 循环播放
  @bindSelf
  changeMusicLoop(checked) {
    transaction(() => {
      this.props.layer.data.loop = checked;
      this.props.h5ds.edata.keys = util.randomID();
      this.setState({ keys: util.randomID() });
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 自动播放
  @bindSelf
  changeMusicAutoPlay(checked) {
    transaction(() => {
      this.props.layer.data.autoplay = checked;
      this.props.h5ds.edata.keys = util.randomID();
      this.setState({ keys: util.randomID() });
      window.pubSubEditor.publish('h5ds.setHistory');
    });
  }

  // 替换音乐方法
  @bindSelf
  changeSound() {
    window.pubSubEditor.publish('h5ds.sound.modal.show', {
      callback: data => {
        const { url, name } = data;
        const winload = new WinLoad();
        this.loadSource.soundLazy(url).then(audio => {
          winload.destroy();
          transaction(() => {
            this.props.layer.data.name = name;
            this.props.layer.data.sound = url;
            this.props.layer.data.duration = audio.duration;
            this.setState({ keys: util.randomID() });
            window.pubSubEditor.publish('h5ds.setHistory');
          });
        });
      }
    });
  }

  render() {
    this.state.keys;
    const { delay, autoplay, loop, icon, name, sound } = this.props.layer.data;
    return (
      <div className="h5ds-ex-h5ds_sound">
        <SetGrid span={2}>
          <SetItem name="音乐图标">
            <Switch checked={icon !== 'null'} onChange={this.changeMusicIcon} />
          </SetItem>
        </SetGrid>
        <SetGrid span={2}>
          <SetItem name="循环播放">
            <Switch checked={loop} onChange={this.changeMusicLoop} />
          </SetItem>
        </SetGrid>
        <SetGrid span={2}>
          <SetItem name="自动播放">
            <Switch checked={autoplay} onChange={this.changeMusicAutoPlay} />
          </SetItem>
        </SetGrid>
        <SetGrid span={2}>
          <SetItem name="延迟时间">
            <InputNumber step={0.1} min={0} value={delay} onChange={this.changeDelay} size="small" />
          </SetItem>
        </SetGrid>
        <SetItem name="当前音乐">
          <span className="h5ds-ex-h5ds_sound-name">{name}</span>
          <audio className="h5ds-sound-controls" key={sound} controls>
            <source src={sound} type="audio/mpeg" />
          </audio>
          <Button type="primary" onClick={this.changeSound}>
            替换音乐
          </Button>
        </SetItem>
      </div>
    );
  }
}
/**
 * 图层对于JSON数据
 */
class LayerJSON {
  id = null;
  className = null;
  animate = [];
  data = {
    icon: 'default', // 默认icon：style1, style2 ... 或者是图片url
    name: '圣诞节音乐',
    autoplay: true, // 默认自动播放
    loop: false, // 循环播放
    delay: 0, // 声音开始时间
    duration: 1.7, // 持续播放时间，单位秒s
    sound: 'http://cdn.h5ds.cn/static/sound/星星闪耀的转场声音.mp3'
  };
  style = {
    top: 0,
    left: 0,
    width: 26,
    height: 26,
    display: 'block'
  };
  estyle = {};
  events = [];
}

const icon = <i className="h5ds-ico h5ds-ico-yinle" />;

// 添加图片的业务
function addSoundLayer(elem, props) {
  const { h5ds } = props;
  const { pluginsKey } = props.scope;
  const data = h5ds.getJsonByPid(pluginsKey, 'h5ds_sound');
  const winload = new WinLoad();
  new LoadSource().soundLazy(elem.url).then(audio => {
    winload.destroy();
    if (audio) {
      transaction(() => {
        data.data.name = elem.name;
        data.data.sound = elem.url;
        data.data.duration = audio.duration;
        h5ds.addLayer(data);
        h5ds.edata.keys = util.randomID();
        h5ds.setLayer(0);
        window.pubSubEditor.publish('h5ds.setHistory');
      });
    } else {
      message.error('音乐加载失败！');
    }
  });
}

// 点击按钮，触发弹窗，传入一个callback函数，这个函数会在Modal内部触发
function selectIcon(props) {
  // 添加音乐
  window.pubSubEditor.publish('h5ds.sound.modal.show', {
    callback: elem => {
      addSoundLayer(elem, props);
    }
  });
}

export { Editor, LayerJSON, icon, selectIcon };
