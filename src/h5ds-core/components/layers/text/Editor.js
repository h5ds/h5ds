import './editor.less';

import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';

import EditorSet from './components/EditorSet';
import { transaction } from 'mobx';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: util.randomID() // 同步修改编辑器区域
    };
  }

  // 选中文字
  selectText(text) {
    if (document.body.createTextRange) {
      let range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      let selection = window.getSelection();
      let range = document.createRange();
      if (!range) {
        return false;
      }
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      console.error('selectText none');
    }
  }

  // dbclick
  @bindSelf
  dbclickEvent() {
    // 双击文本框，可编辑
    $('#h5dsCanvas').on('dblclick.texteditor', '.h5ds-control', e => {
      // 变成编辑器
      const { h5ds, layer } = this.props;
      this.$layer = h5ds.getLayerDom();
      this.control = $(e.target);
      this.control.css('z-index', '-1');
      this.editAuto = this.$layer.find('.layer-h5ds_text-auto');
      this.editAuto.html(layer.data.data);
      this.editAuto.attr('contenteditable', 'true');
      this.selectText(this.editAuto[0]);

      // 失去焦点的时候设置数据
      this.editAuto.off('blur').on('blur', e => {
        e.stopPropagation();
        transaction(() => {
          const shtml = this.editAuto.html();
          this.props.layer.style.height = this.editAuto.height();
          this.props.layer.data.data = shtml;
          this.props.layer.data.keyid = util.randomID();
          this.props.h5ds.edata.keys = util.randomID();
          $('.h5ds-ex-h5ds_text-richtext')[0] && $('.h5ds-ex-h5ds_text-richtext').html(shtml);
          window.pubSubEditor.publish('h5ds.setHistory');
        });
      });

      // 粘贴的时候去掉格式
      this.editAuto.off('paste').on('paste', function(e) {
        e.preventDefault();
        const text = e.originalEvent.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      });
    });
  }

  // 缩放后，自动修改文字大小
  @bindSelf
  scaleEvent() {
    const { h5ds, layer } = this.props;
    this.$layer = h5ds.getLayerDom();
    this.$layer.on('controlStart.h5ds.text', (e, data) => {
      this.startHeight = data ? data.height : null;
      this.fontSize = parseInt(layer.data.style.fontSize, 10);
      this.layerBox = this.$layer.find('.layer-h5ds_text-auto');
    });
    this.$layer.on('controlResizeTick.h5ds.text', (e, data) => {
      // 通过height 设置文字大小 行距=字体大小 * 3/2
      this.moveHeight = data ? data.height : null;
      if (this.startHeight && this.moveHeight) {
        let scale = this.startHeight / this.moveHeight;
        let fontSize = this.fontSize / scale;
        this.layerBox.css('font-size', (fontSize < 12 ? 12 : fontSize) + 'px');
      }
    });
    this.$layer.on('controlEnd.h5ds.text', (e, data) => {
      if (data) {
        this.endHeight = data ? data.height : null;
        let scale = this.startHeight / this.endHeight;
        let fontSize = this.fontSize / scale;
        fontSize = parseInt(fontSize < 12 ? 12 : fontSize, 10) + 'px';
        layer.data.style.fontSize = fontSize;
        setTimeout(() => {
          this.editAuto = this.$layer.find('.layer-h5ds_text-auto');
          if (this.editAuto) {
            layer.style.height = this.editAuto.height();
            window.pubSubEditor.publish('h5ds.setHistory');
            this.setState({ keys: util.randomID() });
          }
        });
        // 同步数据
        this.editorSetRef.setFontSize(fontSize);
      }
    });
  }

  componentDidMount() {
    // 双击编辑文字
    this.dbclickEvent();
    // 缩放修改文字大小
    this.scaleEvent();
  }

  componentWillUnmount() {
    $('#h5dsCanvas').off('dblclick.texteditor');
    this.layerBox = null;
    // 相当于是点击空白处，这里才设置参数,编辑完成
    if (this.editAuto) {
      this.editAuto.removeAttr('contenteditable');
      this.editAuto.off('blur');
      this.editAuto.off('paste');
      this.editAuto.off('input');
      this.editAuto = null;
    }
    if (this.control) {
      this.control.removeAttr('style');
      this.control = null;
    }
    if (this.$layer) {
      this.$layer.off('controlStart.h5ds.text');
      this.$layer.off('controlResizeTick.h5ds.text');
      this.$layer.off('controlEnd.h5ds.text');
      this.$layer = null;
    }
  }

  render() {
    const { keys } = this.state;
    return (
      <div className="h5ds-ex-h5ds_text">
        <EditorSet
          ref={c => (this.editorSetRef = c)}
          h5ds={this.props.h5ds}
          keyid={keys}
          app={this.props.app}
          layer={this.props.layer}
        />
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
    data: '请输入文本内容',
    fontFamilySet: {
      name: '默认字体',
      url: ''
    },
    style: {
      letterSpacing: 'normal',
      color: 'rgba(0,0,0,1)',
      textDecoration: 'normal',
      textAlign: 'left',
      fontFamily: '默认字体',
      // height: 14 / 2 + 14, // 公式
      fontSize: '18px'
    },
    artword: { type: '', name: '', colors: [] },
    animate: ''
  };
  style = { width: 132, height: this.setLineHeight(), top: 0, left: 0 };
  estyle = {};
  events = []; // 事件

  setLineHeight() {
    let fontSize = parseInt(this.data.style.fontSize, 10);
    return fontSize / 2 + fontSize;
  }
}

// 图标
const icon = <i className="h5ds-ico h5ds-ico-wenben" />;

export { Editor, icon, LayerJSON };
