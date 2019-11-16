import React, { Component } from 'react';

import { Popup } from '../pages';

export default class PopupModule extends Component {
  render() {
    const { data, transformStyle, plugins, renderIn, scale, setPageStyle } = this.props;
    return (
      <div className="h5ds-popups" id="h5dsPopups">
        {data.popups.map((elem, index) => {
          const { innerStyle, boxStyle, adsorbTopBottom, adsorbLeftRight } = setPageStyle(elem);

          let cls = 'h5ds-swiper-page';
          if (elem.className) {
            cls += ` ${elem.className}`;
          }
          return (
            <div
              id={elem.id}
              className={cls}
              key={elem.keyid}
              data-keyid={elem.keyid}
              style={{
                transform: 'rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
                width: window.innerWidth,
                height: window.innerHeight
              }}
            >
              <div className="h5ds-pages-box" style={boxStyle}>
                <div style={{ ...innerStyle, ...transformStyle }} className="h5ds-swiper-pageinner">
                  <Popup
                    plugins={plugins}
                    data={elem}
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
        })}
      </div>
    );
  }
}
