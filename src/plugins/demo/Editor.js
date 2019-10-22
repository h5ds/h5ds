import './editor.less';

import React, { Component } from 'react';

const icon = <i className="h5ds-ico h5ds-ico-xingzhuang" />;

/**
 * props: h5ds, scope, layer
 */
class Editor extends Component {
  constructor(props) {
    super(props);
  }

  showModal = () => {
    window.pubSubInstance.publish('demo.show.modal');
  };

  render() {
    return (
      <div className="editor-mantou-demo">
        <button onClick={this.showModal}>点击弹窗</button>
      </div>
    );
  }
}

export { Editor, icon };
