import React, { Component } from 'react';

import { bindSelf } from '../../../../utils';

export default class CombinEditor extends Component {
  @bindSelf
  emitChange() {
    var html = this.dom.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.dom.innerHTML;
  }

  componentDidMount() {
    // 粘贴的时候去掉格式
    $(this.dom)
      .off('paste')
      .on('paste', function(e) {
        e.preventDefault();
        const text = e.originalEvent.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      });
  }

  componentWillUnmount() {
    $(this.dom).off('paste');
  }

  render() {
    const { className, html } = this.props;
    return (
      <div
        ref={c => (this.dom = c)}
        className={className ? className : ''}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}
