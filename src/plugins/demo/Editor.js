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

  render() {
    return (
      <div className="editor-mantou-demo">
        <div>editor</div>
      </div>
    );
  }
}

export { Editor, icon };
