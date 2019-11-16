import React, { Component } from 'react';

import { bindSelf } from '../../utils';

export default class PageButton extends Component {
  state = {
    page: 0
  };

  @bindSelf
  prevPage() {
    this.props.H5SwiperRef.slidePrev();
  }

  @bindSelf
  nextPage() {
    this.props.H5SwiperRef.slideNext();
  }

  componentDidMount() {
    const { H5SwiperRef } = this.props;
    // 切换页面
    if (H5SwiperRef) {
      H5SwiperRef.swiperInstance.on('transitionEnd', () => {
        this.setState({
          page: H5SwiperRef.swiperInstance.h5dsRealIndex
        });
      });
    }
  }

  render() {
    const { pageLength } = this.props;
    const { page } = this.state;
    return (
      <div className="h5ds-phone-preview-pagebutton">
        <a onClick={this.prevPage} className="h5ds-phone-preview-prev">
          上一页
        </a>
        <span>
          {page + 1}/{pageLength}
        </span>
        <a onClick={this.nextPage} className="h5ds-phone-preview-next">
          下一页
        </a>
      </div>
    );
  }
}
