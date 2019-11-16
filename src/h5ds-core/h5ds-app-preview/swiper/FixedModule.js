import React, { Component } from 'react';

import { Fixed } from '../pages';
import { util } from '../../utils/util';

// import { bindSelf } from '../../utils/bindSelf';
export default class FixedpModule extends Component {
  render() {
    const { data, transformStyle, plugins, renderIn, scale, setPageStyle } = this.props;
    const [fixed0Data, fixed1Data] = data.fixeds;
    return (
      <div className="h5ds-fixeds">
        {[fixed0Data, fixed1Data].map((fixedData, index) => {
          let id = null;
          // 因为 setPageStyle 的时候，fixed0Data的高度是0，计算的top和adsorbTopBottom是不正确的，所以这里特殊处理了下，计算完后再设置height=0
          if (index === 0) {
            fixedData = util.toJS(fixedData);
            fixedData.style.height = fixed1Data.style.height;
          }
          let { innerStyle, boxStyle, adsorbTopBottom, adsorbLeftRight } = setPageStyle(fixedData);

          // 上层浮动特殊处理
          if (index === 0) {
            id = 'h5dsFixedsUp';
            innerStyle.height = 0;
          } else {
            id = 'h5dsFixedsDown';
          }
          return (
            <div key={id} id={id}>
              <div className="h5ds-swiper-page">
                <div className="h5ds-pages-box" style={boxStyle}>
                  <div style={{ ...innerStyle, ...transformStyle }} className="h5ds-swiper-pageinner">
                    <Fixed
                      adsorbSet={{
                        scale,
                        adsorbTopBottom,
                        adsorbLeftRight
                      }}
                      plugins={plugins}
                      appData={data}
                      data={fixedData}
                      renderIn={renderIn}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
