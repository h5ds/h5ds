import { Button, Icon, Tabs, Upload, message } from 'antd';
import React, { Component } from 'react';
import { bindSelf, util } from '../../../utils';

import SourceList from '../source-list';
import { config } from '../../../config';
import { data } from './data';

// props.select 是一个选择图的回调方法

class SoundModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systemCategory: [],
      systemSoundList: [],
      systemSoundListCount: 0,
      Sound: 1
    };
    this.userCategoryId = '';
  }

  // 获取列表
  @bindSelf
  getSoundList({ scope = 'user', page = 1, c = '' }) {
    // type=audio&scope=system&c=&keyword=&page=1&size=20
    this.setState({
      systemSoundList: data.rows,
      systemSoundListCount: 0,
      systemSoundListPage: page
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
    this.getSoundList({ page, scope: 'system', c: this.systemCategoryId });
  }

  /**
   * 选择系统分类
   */
  @bindSelf
  selectSystemCategories(d) {
    this.systemCategoryId = d.id;
    this.getSoundList({ scope: 'system', page: 1, c: d.id });
  }

  /**
   * 音乐上传
   */
  @bindSelf
  uploadEnd(info) {
    if (info.file.status === 'done') {
      const { name, path, size } = info.file.response;
    }
  }

  componentDidMount() {
    this.getSoundList({ scope: 'system', page: 1 });
    this.getCategories({ scope: 'system', page: 1 });
  }

  render() {
    const TabPane = Tabs.TabPane;
    return (
      <div className="sound-modal image-modal">
        <Upload
          className="sound-modal-upload image-modal-upload"
          {...{
            multiple: true,
            showUploadList: false,
            name: 'file',
            action: `${config.apiHost}/common/upload`,
            onChange: this.uploadEnd
          }}
        >
          <Button type="primary" className="h5ds-modal-upload-button">
            音乐上传
          </Button>
        </Upload>
        <Tabs defaultActiveKey="2" onChange={this.callback}>
          <TabPane tab="系统音乐" key="2">
            <SourceList
              selectCategories={this.selectSystemCategories}
              defaultActive={''}
              edit={false}
              item={elem => {
                return (
                  <li key={elem.id} className="h5ds-source-item h5ds-source-item2">
                    <div className="h5ds-source-title">{elem.name}</div>
                    <audio className="h5ds-sound-controls" controls>
                      <source src={elem.url} type="audio/mpeg" />
                    </audio>
                    <Button type="link" onClick={() => this.props.select(elem)}>
                      立即使用
                    </Button>
                  </li>
                );
              }}
              count={this.state.systemSoundListCount}
              page={this.state.systemSoundListPage}
              categories={this.state.systemCategory}
              data={this.state.systemSoundList}
              pageChange={this.pageSystemChange}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default SoundModal;
