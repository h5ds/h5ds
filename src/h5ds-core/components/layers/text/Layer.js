import './layer.less';

import React, { Component } from 'react';

import Artword from './components/artword';
import { config } from './config';

/**
 * 图层组件
 */
class LayerComp extends Component {
  filterHtml(str) {
    switch (str) {
      case ' ':
        str = '&nbsp;';
        break;
      case '⑴':
        str = '&nbsp;';
        break;
      case '⑵':
        str = '&quot;';
        break;
      case '⑶':
        str = '&amp;';
        break;
      case '⑷':
        str = '&lt;';
        break;
      case '⑸':
        str = '&gt;';
        break;
    }
    return str;
  }

  getHtml = (data, animate) => {
    let shtml = '';
    // console.log(data);
    data = data.replace(/&nbsp;/g, '⑴'); //_ // ⑴_⑵"⑶&⑷<⑸>
    data = data.replace(/&quot;/g, '⑵'); // "
    data = data.replace(/&amp;/g, '⑶'); // &
    data = data.replace(/&lt;/g, '⑷'); // <
    data = data.replace(/&gt;/g, '⑸'); // >
    if (animate) {
      let i = 0;
      let lock = false;
      data.split('').forEach(d => {
        if (d === '<') {
          lock = true;
        }
        // 下一个
        if (!lock) {
          let delay = parseFloat(animate.delay) + parseFloat(animate.interval) * i;
          i++;
          shtml += `<span class="animated" style="animation: ${animate.animate} ${animate.time} ${
            animate.fun
          } ${delay}s ${animate.count} normal forwards running;
        opacity: 0">${this.filterHtml(d)}</span>`;
        } else {
          shtml += d;
        }
        if (d === '>') {
          lock = false;
        }
      });
    } else {
      let lock = false;
      data.split('').forEach(d => {
        if (d === '<') {
          lock = true;
        }
        // 下一个
        if (!lock) {
          shtml += `<span>${this.filterHtml(d)}</span>`;
        } else {
          shtml += d;
        }
        if (d === '>') {
          lock = false;
        }
      });
    }

    return shtml;
  };

  render() {
    const { layer } = this.props;
    let { style, keyid = '', data = '', artword = {}, animate, fontFamilySet = {} } = layer.data; // ...
    // 如果有动画，修改data
    let shtml = this.getHtml(data, animate);
    let fontStr = `@font-face {
      font-family: ${fontFamilySet.name};
      src: url(${fontFamilySet.url});
    }`;

    if (artword.type) {
      delete style.color;
    }

    return (
      <div className="layer-h5ds_text-inner">
        <div className="layer-h5ds_text-box" key={keyid}>
          {artword.type ? (
            <div className="layer-h5ds_text-auto" style={{ ...style }}>
              <Artword shtml={shtml} {...artword} />
            </div>
          ) : (
            <div className="layer-h5ds_text-auto" style={{ ...style }} dangerouslySetInnerHTML={{ __html: shtml }} />
          )}
          {fontFamilySet.url ? <style>{fontStr}</style> : null}
        </div>
      </div>
    );
  }
}

export { LayerComp, config };
