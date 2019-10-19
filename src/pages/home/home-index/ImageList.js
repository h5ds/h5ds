import React, { Component } from 'react';

export default class ImageList extends Component {
  selectImage = d => {
    console.log(d);

    // 图片导入接口
    this.props.select({ url: d });
  };

  render() {
    const data = [
      'http://cdn.h5ds.com/static/images/ad1.png',
      'http://cdn.h5ds.com/static/images/ad2.png',
      'http://cdn.h5ds.com/static/images/ad3.png'
    ];
    return (
      <div className="image-list">
        <ul>
          {data.map((d, i) => {
            return (
              <li key={i} onClick={() => this.selectImage(d)}>
                <img src={d} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
