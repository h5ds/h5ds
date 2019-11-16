import './adsorbline.less';

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { AdsorbLineCls } from './AdsorbLineCls';

/**
 * @desc 磁力吸线，编辑器专用的
 * @param props h5ds mobx h5ds.js
 */
@inject('h5ds')
@observer
class AdsorbLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: {
        xt: null,
        xc: null,
        xb: null,
        yl: null,
        yc: null,
        yr: null
      }
    };
  }

  componentDidMount() {
    window.pubSubEditor.subscribe('h5ds.control.absorb.start', () => {
      this.adsorb = new AdsorbLineCls();
      this.layersTarget = this.props.h5ds.getPageLayerDom();
      this.layersTarget = this.adsorb.correct(this.layersTarget);
      this.layersTarget = [...this.layersTarget, $('#h5dsCanvasApp')[0], ...$('.h5ds-ruler-guides')];
      this.thisTarget = this.props.h5ds.getLayerDom();
    });
    window.pubSubEditor.subscribe('h5ds.control.absorb.move', () => {
      this.adsorb.check(this.thisTarget, this.layersTarget);
    });
    window.pubSubEditor.subscribe('h5ds.control.absorb.end', () => {
      this.adsorb.uncheck();
      this.adsorb.clear();
    });
  }

  componentWillUnmount() {
    window.pubSubEditor.unsubscribe('h5ds.control.absorb.start');
    window.pubSubEditor.unsubscribe('h5ds.control.absorb.move');
    window.pubSubEditor.unsubscribe('h5ds.control.absorb.end');
  }

  render() {
    const { lines } = this.state;
    return (
      <div className="h5ds-adsorb-lines">
        {Object.keys(lines).map((d, i) => {
          let style = null;
          d[0] === 'x'
            ? (style = { width: '100%', height: 1, left: 0 })
            : (style = { width: 1, height: '100%', top: 0 });
          return <div className="h5ds-adsorb-line" key={i} style={style} />;
        })}
      </div>
    );
  }
}

export default AdsorbLine;
