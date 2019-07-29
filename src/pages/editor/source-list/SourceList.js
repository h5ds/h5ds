import './sourcelist.less';

import { Button, Icon, Input, Pagination, Popconfirm, Popover } from 'antd';
import React, { Component } from 'react';

import { bindSelf } from '../../../utils';

export default class SourceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.defaultActive || '',
      visible: false,
      val: ''
    };
  }

  // 关闭气泡
  @bindSelf
  closePopover() {
    this.setState({ visible: false });
  }

  @bindSelf
  setValue(e) {
    this.setState({ val: e.target.value });
  }

  // 删除Categories
  @bindSelf
  delCategories(elem, e) {
    e.stopPropagation();
    this.props.delCategories && this.props.delCategories(elem);
  }

  // 确认添加标签
  @bindSelf
  addCategories() {
    this.closePopover();
    this.props.addCategories && this.props.addCategories(this.state.val);
  }

  // 选择标签
  @bindSelf
  selectCategories(elem) {
    if (elem.id !== this.state.active) {
      this.setState({
        active: elem.id
      });
      this.props.selectCategories && this.props.selectCategories(elem);
    }
  }

  render() {
    const { edit = false, categories, data } = this.props;
    const { active, visible, val } = this.state;
    return (
      <div className="h5ds-source">
        <div className="h5ds-source-tags">
          <ul>
            {[{ categoryName: '全部', id: '' }, ...categories].map(elem => {
              return (
                <li
                  onClick={() => this.selectCategories(elem)}
                  key={elem.id}
                  className={elem.id === active ? 'h5ds-source-tags-active' : ''}
                >
                  {elem.categoryName}&nbsp;&nbsp;
                  {edit && elem.id !== '' ? (
                    <Popconfirm
                      title="确定删除标签?"
                      onConfirm={e => this.delCategories(elem, e)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon onClick={e => e.stopPropagation()} type="close" />
                    </Popconfirm>
                  ) : null}
                </li>
              );
            })}
            {edit ? (
              <Popover
                visible={visible}
                onVisibleChange={visible => this.setState({ visible })}
                content={
                  <div className="h5ds-source-addtags">
                    <div>
                      <Input onChange={this.setValue} size="small" value={val} />
                    </div>
                    <div>
                      <Button onClick={this.closePopover} size="small">
                        取消
                      </Button>
                      <Button onClick={this.addCategories} type="primary" size="small">
                        确定
                      </Button>
                    </div>
                  </div>
                }
                placement="bottom"
                title={null}
                trigger="click"
              >
                <li>+ 添加标签</li>
              </Popover>
            ) : null}
          </ul>
        </div>
        <div className="h5ds-source-content">
          <ul>
            <li />
            {data.map(elem => {
              return <React.Fragment key={elem.id}>{this.props.item(elem)}</React.Fragment>;
            })}
          </ul>
          <div className="h5ds-source-pagelist">
            <Pagination
              key={this.props.count}
              size="small"
              total={this.props.count}
              current={this.props.page}
              pageSize={20}
              onChange={this.props.pageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
