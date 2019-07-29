import { Button, Icon, Tabs, Upload, message } from 'antd';
import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';

import SourceList from '../source-list';
import { config } from '../../../config';
import { data } from './data';

// props.select 是一个选择图的回调方法
class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systemCategory: [],
      systemImageList: [],
      systemImageListCount: 0,
      systemImageListPage: 1
    };
    this.userCategoryId = '';
  }

  // 获取列表
  @bindSelf
  getImageList({ scope = 'user', page = 1, c = '' }) {
    this.setState({
      systemImageList: data.rows,
      systemImageListCount: 20,
      systemImageListPage: page
    });
  }

  // 获取分类
  @bindSelf
  getCategories({ scope = 'user', page = 1 }) {
    this.setState({
      systemCategory: []
    });
  }

  /**
   * 系统素材分页
   */
  @bindSelf
  pageSystemChange(page) {
    this.getImageList({ page, scope: 'system', c: this.systemCategoryId });
  }

  /**
   * 选择系统分类
   */
  @bindSelf
  selectSystemCategories(d) {
    this.systemCategoryId = d.id;
    this.getImageList({ scope: 'system', page: 1, c: d.id });
  }

  /**
   * 图片上传
   */
  @bindSelf
  uploadEnd(info) {
    if (info.file.status === 'done') {
      const { name, path, size } = info.file.response;
    }
  }

  componentDidMount() {
    this.getImageList({ scope: 'system', page: 1 });
    this.getCategories({ scope: 'system', page: 1 });
  }

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div className="image-modal">
        <Upload
          className="image-modal-upload"
          {...{
            multiple: true,
            showUploadList: false,
            name: 'file',
            action: `${config.apiHost}/common/upload`,
            onChange: this.uploadEnd
          }}
        >
          <Button type="primary" className="h5ds-modal-upload-button">
            图片上传
          </Button>
        </Upload>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="系统图库" key="2">
            <SourceList
              selectCategories={this.selectSystemCategories}
              defaultActive={''}
              edit={false}
              count={this.state.systemImageListCount}
              page={this.state.systemImageListPage}
              categories={this.state.systemCategory}
              data={this.state.systemImageList}
              pageChange={this.pageSystemChange}
              item={elem => {
                return (
                  <li key={elem.id} onClick={e => this.props.select(elem)} className="h5ds-source-item">
                    {elem.url ? <img src={elem.url} /> : null}
                  </li>
                );
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default ImageModal;
