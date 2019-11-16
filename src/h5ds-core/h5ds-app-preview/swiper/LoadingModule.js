import React, { Component } from 'react';

import { Page } from '../pages';
import { util } from '../../utils/util';

export default class LoadingModule extends Component {
  render() {
    const { data, transformStyle, plugins, renderIn, scale, setPageStyle } = this.props;
    const fixedData = util.toJS(data.fixeds[2]);
    const { innerStyle, boxStyle, adsorbTopBottom, adsorbLeftRight } = setPageStyle(fixedData);
    return (
      <div className="h5ds-swiper-page">
        <div className="h5ds-pages-box" style={boxStyle}>
          <div style={{ ...innerStyle, ...transformStyle }} className="h5ds-swiper-pageinner">
            <Page
              plugins={plugins}
              data={fixedData}
              appData={data}
              renderIn={renderIn}
              adsorbSet={{
                scale,
                adsorbTopBottom,
                adsorbLeftRight
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
